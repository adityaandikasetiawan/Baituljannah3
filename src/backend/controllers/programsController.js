const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');

const slugify = (value) => {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const ensureUniqueSlug = async (base, excludeId) => {
  const cleaned = slugify(base) || `program-${Date.now()}`;
  const params = excludeId ? [cleaned, excludeId] : [cleaned];
  const where = excludeId ? 'slug = ? AND id <> ?' : 'slug = ?';
  const existing = await getOne(`SELECT id FROM programs WHERE ${where} LIMIT 1`, params);
  if (!existing) return cleaned;
  return `${cleaned}-${Date.now()}`;
};

const resolveSchoolUnitIdByCode = async (code) => {
  if (!code) return null;
  const trimmed = String(code).trim();
  if (!trimmed) return null;
  if (['SEMUA', 'ALL', 'YAYASAN', 'MAIN'].includes(trimmed.toUpperCase())) return null;
  const row = await getOne('SELECT id FROM school_units WHERE UPPER(code) = ? LIMIT 1', [trimmed.toUpperCase()]);
  return row ? Number(row.id) : null;
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

const getEffectiveSchoolUnitId = async (req, unitCodeFromBodyOrQuery) => {
  const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
  if (forcedUnitCode) {
    return await resolveSchoolUnitIdByCode(forcedUnitCode);
  }

  if (req.user?.role_raw === 'admin_unit') {
    return req.user.school_unit_id == null ? null : Number(req.user.school_unit_id);
  }

  return await resolveSchoolUnitIdByCode(unitCodeFromBodyOrQuery);
};

const toResponseRow = (row) => {
  if (!row) return row;
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description || null,
    icon: row.icon || null,
    image_url: row.image_url || null,
    category: row.category || null,
    status: row.status,
    unit_code: row.unit_code || 'Semua',
    created_at: row.created_at,
    updated_at: row.updated_at
  };
};

const uploadsBaseDir = path.resolve(__dirname, '../../../public/uploads');
const programsUploadDir = path.join(uploadsBaseDir, 'programs');
try {
  fs.mkdirSync(programsUploadDir, { recursive: true });
} catch {}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, programsUploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.bin';
    const safeExt = ext.length <= 10 ? ext : '.bin';
    const name = `program_${Date.now()}_${Math.random().toString(36).slice(2, 10)}${safeExt}`;
    cb(null, name);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowed = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
  if (file.mimetype && allowed.has(file.mimetype)) return cb(null, true);
  cb(new Error('File harus berupa gambar'));
};

exports.uploadProgramImage = multer({
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
      url: `/uploads/programs/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    }
  });
};

exports.getProgramsPublic = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit || '50', 10), 1), 200);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const offset = (page - 1) * limit;

    const values = [];
    const where = ['p.status = "active"'];

    const forcedSchoolUnitId = await getEffectiveSchoolUnitId(req, req.query.unit_code);
    if (forcedSchoolUnitId != null) {
      where.push('p.school_unit_id = ?');
      values.push(Number(forcedSchoolUnitId));
    } else if (req.query.unit_code && String(req.query.unit_code).trim() && String(req.query.unit_code).toLowerCase() !== 'semua') {
      const requestedId = await resolveSchoolUnitIdByCode(req.query.unit_code);
      if (requestedId != null) {
        where.push('p.school_unit_id = ?');
        values.push(Number(requestedId));
      }
    }

    if (req.query.category) {
      where.push('p.category = ?');
      values.push(String(req.query.category));
    }

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const rows = await executeQuery(
      `SELECT p.*, COALESCE(su.code, 'Semua') AS unit_code
       FROM programs p
       LEFT JOIN school_units su ON su.id = p.school_unit_id
       ${whereClause}
       ORDER BY p.created_at DESC, p.id DESC
       LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    res.status(200).json({ success: true, data: rows.map(toResponseRow), pagination: { page, limit } });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengambil data program' });
  }
};

exports.getProgramsManage = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit || '50', 10), 1), 200);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const offset = (page - 1) * limit;

    const values = [];
    const where = [];

    const forcedSchoolUnitId = await getEffectiveSchoolUnitId(req, req.query.unit_code);
    if (req.user?.role_raw === 'admin_unit' && forcedSchoolUnitId == null) {
      return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
    }

    if (forcedSchoolUnitId != null) {
      where.push('p.school_unit_id = ?');
      values.push(Number(forcedSchoolUnitId));
    } else if (req.query.unit_code && String(req.query.unit_code).trim() && String(req.query.unit_code).toLowerCase() !== 'semua') {
      const requestedId = await resolveSchoolUnitIdByCode(req.query.unit_code);
      if (requestedId != null) {
        where.push('p.school_unit_id = ?');
        values.push(Number(requestedId));
      }
    }

    if (req.query.status) {
      const status = String(req.query.status).toLowerCase() === 'inactive' ? 'inactive' : 'active';
      where.push('p.status = ?');
      values.push(status);
    }

    if (req.query.category) {
      where.push('p.category = ?');
      values.push(String(req.query.category));
    }

    if (req.query.search) {
      where.push('(p.title LIKE ? OR p.description LIKE ?)');
      values.push(`%${req.query.search}%`, `%${req.query.search}%`);
    }

    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const rows = await executeQuery(
      `SELECT p.*, COALESCE(su.code, 'Semua') AS unit_code
       FROM programs p
       LEFT JOIN school_units su ON su.id = p.school_unit_id
       ${whereClause}
       ORDER BY p.created_at DESC, p.id DESC
       LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    res.status(200).json({ success: true, data: rows.map(toResponseRow), pagination: { page, limit } });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengambil data program (admin)' });
  }
};

exports.createProgram = async (req, res) => {
  try {
    const title = req.body?.title ? String(req.body.title).trim() : '';
    if (!title) return res.status(400).json({ success: false, message: 'Title wajib diisi' });

    const unitCode = req.body?.unit_code ? String(req.body.unit_code).trim() : '';
    const schoolUnitId = await getEffectiveSchoolUnitId(req, unitCode);
    if (req.user?.role_raw === 'admin_unit' && schoolUnitId == null) {
      return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
    }
    if (unitCode && schoolUnitId == null && !['SEMUA', 'ALL', 'YAYASAN', 'MAIN'].includes(unitCode.toUpperCase())) {
      return res.status(400).json({ success: false, message: 'Unit tidak valid' });
    }

    const category = req.body?.category ? String(req.body.category).trim() : null;
    const description = req.body?.description ? String(req.body.description).trim() : null;
    const icon = req.body?.icon ? String(req.body.icon).trim() : null;
    const imageUrl = req.body?.image_url ? String(req.body.image_url).trim() : null;
    const status = String(req.body?.status).toLowerCase() === 'inactive' ? 'inactive' : 'active';
    const slug = await ensureUniqueSlug(req.body?.slug || title, null);

    const id = await insert(
      `INSERT INTO programs (school_unit_id, title, slug, description, icon, image_url, category, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [schoolUnitId, title, slug, description || null, icon || null, imageUrl || null, category || null, status]
    );

    const created = await getOne(
      `SELECT p.*, COALESCE(su.code, 'Semua') AS unit_code
       FROM programs p
       LEFT JOIN school_units su ON su.id = p.school_unit_id
       WHERE p.id = ?`,
      [id]
    );
    res.status(201).json({ success: true, data: toResponseRow(created) });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal membuat program' });
  }
};

exports.updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getOne('SELECT * FROM programs WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Program tidak ditemukan' });

    const forcedSchoolUnitId = await getEffectiveSchoolUnitId(req, existing.school_unit_id);
    if (req.user?.role_raw === 'admin_unit' && forcedSchoolUnitId == null) {
      return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
    }
    if (forcedSchoolUnitId != null && Number(existing.school_unit_id) !== Number(forcedSchoolUnitId)) {
      return res.status(403).json({ success: false, message: 'Tidak boleh mengubah data unit lain' });
    }

    const title = req.body?.title !== undefined ? String(req.body.title || '').trim() : existing.title;
    if (!title) return res.status(400).json({ success: false, message: 'Title wajib diisi' });

    const unitCode = req.body?.unit_code !== undefined ? String(req.body.unit_code || '').trim() : null;
    const nextSchoolUnitId = unitCode === null ? existing.school_unit_id : await getEffectiveSchoolUnitId(req, unitCode);
    if (unitCode !== null && unitCode && nextSchoolUnitId == null && !['SEMUA', 'ALL', 'YAYASAN', 'MAIN'].includes(unitCode.toUpperCase())) {
      return res.status(400).json({ success: false, message: 'Unit tidak valid' });
    }

    const nextSlug = req.body?.slug !== undefined ? String(req.body.slug || '').trim() : existing.slug;
    const slug = nextSlug ? await ensureUniqueSlug(nextSlug, Number(id)) : await ensureUniqueSlug(title, Number(id));
    const description = req.body?.description !== undefined ? (req.body.description ? String(req.body.description).trim() : null) : existing.description;
    const icon = req.body?.icon !== undefined ? (req.body.icon ? String(req.body.icon).trim() : null) : existing.icon;
    const imageUrl = req.body?.image_url !== undefined ? (req.body.image_url ? String(req.body.image_url).trim() : null) : existing.image_url;
    const category = req.body?.category !== undefined ? (req.body.category ? String(req.body.category).trim() : null) : existing.category;
    const status = req.body?.status !== undefined ? (String(req.body.status).toLowerCase() === 'inactive' ? 'inactive' : 'active') : existing.status;

    await update(
      `UPDATE programs SET
         school_unit_id = ?,
         title = ?,
         slug = ?,
         description = ?,
         icon = ?,
         image_url = ?,
         category = ?,
         status = ?,
         updated_at = NOW()
       WHERE id = ?`,
      [nextSchoolUnitId, title, slug, description, icon, imageUrl, category, status, Number(id)]
    );

    const updated = await getOne(
      `SELECT p.*, COALESCE(su.code, 'Semua') AS unit_code
       FROM programs p
       LEFT JOIN school_units su ON su.id = p.school_unit_id
       WHERE p.id = ?`,
      [id]
    );
    res.status(200).json({ success: true, data: toResponseRow(updated) });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengubah program' });
  }
};

exports.deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getOne('SELECT * FROM programs WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Program tidak ditemukan' });

    const forcedSchoolUnitId = await getEffectiveSchoolUnitId(req, existing.school_unit_id);
    if (req.user?.role_raw === 'admin_unit' && forcedSchoolUnitId == null) {
      return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
    }
    if (forcedSchoolUnitId != null && Number(existing.school_unit_id) !== Number(forcedSchoolUnitId)) {
      return res.status(403).json({ success: false, message: 'Tidak boleh menghapus data unit lain' });
    }

    await deleteRow('DELETE FROM programs WHERE id = ?', [id]);
    res.status(200).json({ success: true, message: 'Program berhasil dihapus' });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal menghapus program' });
  }
};

