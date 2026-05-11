const path = require('path');
const multer = require('multer');
const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');

const uploadsBaseDir = path.resolve(__dirname, '../../../public/uploads');
const achievementUploadDir = path.join(uploadsBaseDir, 'achievement');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, achievementUploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.bin';
    const safeExt = ext.length <= 10 ? ext : '.bin';
    const name = `achievement_${Date.now()}_${Math.random().toString(36).slice(2, 10)}${safeExt}`;
    cb(null, name);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowed = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
  if (file.mimetype && allowed.has(file.mimetype)) return cb(null, true);
  cb(new Error('File harus berupa gambar'));
};

exports.uploadAchievementImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
}).single('image');

exports.handleUploadResponse = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'File tidak ditemukan' });
  }

  res.status(201).json({
    success: true,
    data: {
      url: `/uploads/achievement/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    }
  });
};

const buildWhere = (query, values) => {
  const where = [];

  if (query.status) {
    where.push('status = ?');
    values.push(query.status);
  }

  if (query.category) {
    where.push('category = ?');
    values.push(query.category);
  }

  if (query.level) {
    where.push('level = ?');
    values.push(query.level);
  }

  if (query.school_unit_id) {
    where.push('school_unit_id = ?');
    values.push(Number(query.school_unit_id));
  }

  return where.length ? `WHERE ${where.join(' AND ')}` : '';
};

const resolveUnitCodeFromRequestHost = (req) => {
  const forwardedHost = req.headers['x-forwarded-host'] || req.headers.host || '';
  const hostname = String(Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost)
    .split(',')[0]
    .trim()
    .split(':')[0]
    .toLowerCase();
  if (hostname === 'smpitbaituljannah.sch.id' || hostname === 'www.smpitbaituljannah.sch.id') return 'SMPIT';
  if (hostname === 'smaitbaituljannah.sch.id' || hostname === 'www.smaitbaituljannah.sch.id') return 'SMAIT';
  return null;
};

const getEffectiveSchoolUnitId = async (req, schoolUnitIdFromBodyOrQuery) => {
  const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
  if (forcedUnitCode) {
    const row = await getOne('SELECT id FROM school_units WHERE code = ? LIMIT 1', [forcedUnitCode]);
    return row ? Number(row.id) : null;
  }

  if (req.user?.role_raw === 'admin_unit') {
    return req.user.school_unit_id == null ? null : Number(req.user.school_unit_id);
  }

  if (schoolUnitIdFromBodyOrQuery == null || schoolUnitIdFromBodyOrQuery === '') return null;
  return Number(schoolUnitIdFromBodyOrQuery);
};

exports.getAchievementsPublic = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit || '12', 10), 1), 50);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const offset = (page - 1) * limit;

    const values = [];
    const forcedSchoolUnitId = await getEffectiveSchoolUnitId(req, req.query.school_unit_id);
    const whereClause = buildWhere(
      { ...req.query, status: 'published', school_unit_id: forcedSchoolUnitId ?? req.query.school_unit_id },
      values
    );

    const rows = await executeQuery(
      `SELECT id, school_unit_id, title, description, category, level, \`rank\`, student_name, teacher_name, achievement_date, image_url, certificate_url, status
       FROM achievements
       ${whereClause}
       ORDER BY achievement_date DESC, id DESC
       LIMIT ${limit} OFFSET ${offset}`,
      values
    );

    res.status(200).json({ success: true, data: rows, pagination: { page, limit } });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengambil data prestasi' });
  }
};

exports.getAchievementsManage = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit || '50', 10), 1), 200);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const offset = (page - 1) * limit;

    const forcedSchoolUnitId = await getEffectiveSchoolUnitId(req, req.query.school_unit_id);
    if (req.user?.role_raw === 'admin_unit' && !forcedSchoolUnitId) {
      return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
    }

    const values = [];
    const whereClause = buildWhere(
      forcedSchoolUnitId != null ? { ...req.query, school_unit_id: forcedSchoolUnitId } : req.query,
      values
    );

    const rows = await executeQuery(
      `SELECT *
       FROM achievements
       ${whereClause}
       ORDER BY created_at DESC, id DESC
       LIMIT ${limit} OFFSET ${offset}`,
      values
    );

    res.status(200).json({ success: true, data: rows, pagination: { page, limit } });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengambil data prestasi' });
  }
};

exports.createAchievement = async (req, res) => {
  try {
    const {
      school_unit_id,
      title,
      description,
      category,
      level,
      rank,
      student_name,
      teacher_name,
      achievement_date,
      image_url,
      certificate_url,
      status
    } = req.body;

    const forcedSchoolUnitId = await getEffectiveSchoolUnitId(req, school_unit_id);
    if (req.user?.role_raw === 'admin_unit' && !forcedSchoolUnitId) {
      return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
    }

    if (!title || !String(title).trim()) return res.status(400).json({ success: false, message: 'Title wajib diisi' });
    if (!level) return res.status(400).json({ success: false, message: 'Level wajib diisi' });

    const statusValue = status === 'draft' ? 'draft' : 'published';

    const id = await insert(
      `INSERT INTO achievements
       (school_unit_id, title, description, category, level, \`rank\`, student_name, teacher_name, achievement_date, image_url, certificate_url, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        forcedSchoolUnitId,
        String(title).trim(),
        description && String(description).trim() ? String(description).trim() : null,
        category && String(category).trim() ? String(category).trim() : null,
        level,
        rank && String(rank).trim() ? String(rank).trim() : null,
        student_name && String(student_name).trim() ? String(student_name).trim() : null,
        teacher_name && String(teacher_name).trim() ? String(teacher_name).trim() : null,
        achievement_date || null,
        image_url && String(image_url).trim() ? String(image_url).trim() : null,
        certificate_url && String(certificate_url).trim() ? String(certificate_url).trim() : null,
        statusValue
      ]
    );

    const created = await getOne('SELECT * FROM achievements WHERE id = ?', [id]);
    res.status(201).json({ success: true, data: created });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal membuat prestasi' });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getOne('SELECT * FROM achievements WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Prestasi tidak ditemukan' });

    const forcedSchoolUnitId = await getEffectiveSchoolUnitId(req, existing.school_unit_id);
    if (req.user?.role_raw === 'admin_unit' && !forcedSchoolUnitId) {
      return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
    }
    if (forcedSchoolUnitId != null && Number(existing.school_unit_id) !== Number(forcedSchoolUnitId)) {
      return res.status(403).json({ success: false, message: 'Tidak boleh mengubah data unit lain' });
    }

    const next = {
      school_unit_id: forcedSchoolUnitId,
      title: req.body.title !== undefined ? String(req.body.title).trim() : existing.title,
      description: req.body.description !== undefined ? (req.body.description ? String(req.body.description).trim() : null) : existing.description,
      category: req.body.category !== undefined ? (req.body.category ? String(req.body.category).trim() : null) : existing.category,
      level: req.body.level !== undefined ? req.body.level : existing.level,
      rank: req.body.rank !== undefined ? (req.body.rank ? String(req.body.rank).trim() : null) : existing.rank,
      student_name: req.body.student_name !== undefined ? (req.body.student_name ? String(req.body.student_name).trim() : null) : existing.student_name,
      teacher_name: req.body.teacher_name !== undefined ? (req.body.teacher_name ? String(req.body.teacher_name).trim() : null) : existing.teacher_name,
      achievement_date: req.body.achievement_date !== undefined ? req.body.achievement_date : existing.achievement_date,
      image_url: req.body.image_url !== undefined ? (req.body.image_url ? String(req.body.image_url).trim() : null) : existing.image_url,
      certificate_url: req.body.certificate_url !== undefined ? (req.body.certificate_url ? String(req.body.certificate_url).trim() : null) : existing.certificate_url,
      status: req.body.status === 'draft' ? 'draft' : req.body.status === 'published' ? 'published' : existing.status
    };

    if (!next.title) return res.status(400).json({ success: false, message: 'Title wajib diisi' });
    if (!next.level) return res.status(400).json({ success: false, message: 'Level wajib diisi' });

    await update(
      `UPDATE achievements SET
       school_unit_id = ?, title = ?, description = ?, category = ?, level = ?, \`rank\` = ?, student_name = ?, teacher_name = ?,
       achievement_date = ?, image_url = ?, certificate_url = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        next.school_unit_id,
        next.title,
        next.description,
        next.category,
        next.level,
        next.rank,
        next.student_name,
        next.teacher_name,
        next.achievement_date,
        next.image_url,
        next.certificate_url,
        next.status,
        id
      ]
    );

    const updatedRow = await getOne('SELECT * FROM achievements WHERE id = ?', [id]);
    res.status(200).json({ success: true, data: updatedRow });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengupdate prestasi' });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getOne('SELECT id, school_unit_id FROM achievements WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Prestasi tidak ditemukan' });

    const forcedSchoolUnitId = await getEffectiveSchoolUnitId(req, existing.school_unit_id);
    if (req.user?.role_raw === 'admin_unit' && !forcedSchoolUnitId) {
      return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
    }
    if (forcedSchoolUnitId != null && Number(existing.school_unit_id) !== Number(forcedSchoolUnitId)) {
      return res.status(403).json({ success: false, message: 'Tidak boleh menghapus data unit lain' });
    }

    const affected = await deleteRow('DELETE FROM achievements WHERE id = ?', [id]);
    res.status(200).json({ success: true, message: 'Prestasi berhasil dihapus' });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal menghapus prestasi' });
  }
};
