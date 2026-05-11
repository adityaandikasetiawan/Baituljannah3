const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');

const uploadsBaseDir = path.resolve(__dirname, '../../../public/uploads');
const galleryUploadDir = path.join(uploadsBaseDir, 'gallery');

fs.mkdirSync(galleryUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, galleryUploadDir),
  filename: (_req, file, cb) => {
    const extByMime = {
      'image/jpeg': '.jpg',
      'image/jpg': '.jpg',
      'image/pjpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
      'image/gif': '.gif',
    };
    const safeExt = extByMime[file.mimetype] || '.bin';
    const name = `gallery_${Date.now()}_${Math.random().toString(36).slice(2, 10)}${safeExt}`;
    cb(null, name);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowed = new Set(['image/jpeg', 'image/jpg', 'image/pjpeg', 'image/png', 'image/webp', 'image/gif']);
  if (file.mimetype && allowed.has(file.mimetype)) return cb(null, true);

  const name = String(file.originalname || '').toLowerCase();
  const ext = path.extname(name);
  const allowedExt = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
  if ((!file.mimetype || file.mimetype === 'application/octet-stream') && allowedExt.has(ext)) return cb(null, true);

  cb(new Error('Format file tidak didukung. Gunakan JPG/PNG/WEBP/GIF.'));
};

const uploader = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
}).single('image');

const safeUnlink = async (absolutePath) => {
  try {
    await fs.promises.unlink(absolutePath);
  } catch {
    return;
  }
};

const normalizeDbImageUrl = (value) => {
  if (!value) return value;
  const url = String(value);
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return url;
  if (url.startsWith('uploads/')) return `/${url}`;
  if (url.startsWith('gallery/')) return `/uploads/${url}`;
  return `/uploads/${url}`;
};

const getLocalFilePathFromUrl = (imageUrl) => {
  if (!imageUrl) return null;
  const url = normalizeDbImageUrl(imageUrl);
  if (!url.startsWith('/uploads/gallery/')) return null;
  const filename = url.replace('/uploads/gallery/', '');
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) return null;
  return path.join(galleryUploadDir, filename);
};

const resolveSchoolUnitIdByCode = async (unitCode) => {
  if (!unitCode) return null;
  const code = String(unitCode).trim().toUpperCase();
  if (!code || code === 'SEMUA' || code === 'ALL' || code === 'YAYASAN') return null;
  const row = await getOne('SELECT id FROM school_units WHERE code = ? LIMIT 1', [code]);
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

const getEffectiveSchoolUnitId = async (req, bodyUnitCode) => {
  const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
  if (forcedUnitCode) {
    const id = await resolveSchoolUnitIdByCode(forcedUnitCode);
    return { schoolUnitId: id, unitCode: forcedUnitCode, forced: true };
  }

  if (req.user?.role_raw === 'admin_unit') {
    const id = req.user.school_unit_id;
    return { schoolUnitId: id == null ? null : Number(id), unitCode: null, forced: true };
  }

  const unitCode = bodyUnitCode ? String(bodyUnitCode).trim() : '';
  const id = await resolveSchoolUnitIdByCode(unitCode);
  return { schoolUnitId: id, unitCode, forced: false };
};

exports.uploadGalleryImage = (req, res, next) => {
  uploader(req, res, (err) => {
    if (!err) return next();
    return res.status(400).json({ success: false, message: err.message || 'Upload gagal' });
  });
};

const buildWhere = (query, values, { forcePublished } = { forcePublished: false }) => {
  const where = [];

  if (forcePublished) {
    where.push("g.status = 'published'");
  } else if (query.status) {
    where.push('g.status = ?');
    values.push(String(query.status));
  }

  if (query.category) {
    where.push('g.category = ?');
    values.push(String(query.category));
  }

  if (query.school_unit_id) {
    const parsed = Number(query.school_unit_id);
    if (Number.isFinite(parsed)) {
      where.push('g.school_unit_id = ?');
      values.push(parsed);
    }
  }

  if (query.unit_code) {
    where.push('su.code = ?');
    values.push(String(query.unit_code).trim().toUpperCase());
  }

  return where.length ? `WHERE ${where.join(' AND ')}` : '';
};

exports.getGalleryPublic = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit || '24', 10), 1), 100);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const offset = (page - 1) * limit;

    const values = [];
    const whereClause = buildWhere(req.query, values, { forcePublished: true });

    const rows = await executeQuery(
      `SELECT
        g.id,
        g.school_unit_id,
        su.code AS unit_code,
        su.name AS unit_name,
        g.title,
        g.description,
        g.keterangan,
        g.image_url,
        g.thumbnail_url,
        g.category,
        g.tags,
        g.event_date,
        g.views,
        g.status,
        g.created_at,
        g.updated_at
      FROM gallery g
      LEFT JOIN school_units su ON su.id = g.school_unit_id
      ${whereClause}
      ORDER BY g.event_date DESC, g.created_at DESC, g.id DESC
      LIMIT ${limit} OFFSET ${offset}`,
      values
    );

    const normalized = rows.map((r) => ({
      ...r,
      image_url: normalizeDbImageUrl(r.image_url),
      thumbnail_url: normalizeDbImageUrl(r.thumbnail_url),
    }));

    res.status(200).json({ success: true, data: normalized, pagination: { page, limit } });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengambil data galeri' });
  }
};

exports.getGalleryManage = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit || '100', 10), 1), 200);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const offset = (page - 1) * limit;

    const values = [];
    const whereClauseBase = buildWhere(req.query, values, { forcePublished: false });
    const whereParts = whereClauseBase ? [whereClauseBase.replace(/^WHERE\s+/i, '')] : [];

    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    if (forcedUnitCode) {
      whereParts.push('su.code = ?');
      values.push(forcedUnitCode);
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) {
        return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      }
      whereParts.push('g.school_unit_id = ?');
      values.push(Number(req.user.school_unit_id));
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    const rows = await executeQuery(
      `SELECT
        g.*,
        su.code AS unit_code,
        su.name AS unit_name,
        up.full_name AS uploaded_by_name
      FROM gallery g
      LEFT JOIN school_units su ON su.id = g.school_unit_id
      LEFT JOIN user_profiles up ON up.user_id = g.uploaded_by
      ${whereClause}
      ORDER BY g.created_at DESC, g.id DESC
      LIMIT ${limit} OFFSET ${offset}`,
      values
    );

    const normalized = rows.map((r) => ({
      ...r,
      image_url: normalizeDbImageUrl(r.image_url),
      thumbnail_url: normalizeDbImageUrl(r.thumbnail_url),
    }));

    res.status(200).json({ success: true, data: normalized, pagination: { page, limit } });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengambil data galeri' });
  }
};

exports.createGallery = async (req, res) => {
  const uploadedFilePath = req.file ? path.join(galleryUploadDir, req.file.filename) : null;
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'File gambar wajib diupload' });

    const title = req.body?.title ? String(req.body.title).trim() : '';
    if (!title) {
      if (uploadedFilePath) await safeUnlink(uploadedFilePath);
      return res.status(400).json({ success: false, message: 'Title wajib diisi' });
    }

    const unitCode = req.body?.unit_code ? String(req.body.unit_code).trim() : '';
    const { schoolUnitId } = await getEffectiveSchoolUnitId(req, unitCode);
    if (req.user?.role_raw === 'admin_unit' && !schoolUnitId) {
      if (uploadedFilePath) await safeUnlink(uploadedFilePath);
      return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
    }

    if (unitCode && !schoolUnitId && !['SEMUA', 'ALL', 'YAYASAN'].includes(unitCode.toUpperCase())) {
      if (uploadedFilePath) await safeUnlink(uploadedFilePath);
      return res.status(400).json({ success: false, message: 'Unit tidak valid' });
    }

    const keteranganValue = req.body?.keterangan ? String(req.body.keterangan).trim() : '';
    const categoryValue = req.body?.category ? String(req.body.category).trim() : null;
    const tagsValue = req.body?.tags ? String(req.body.tags).trim() : null;
    const eventDateValue = req.body?.event_date ? String(req.body.event_date).trim() : null;
    const statusValue = req.body?.status === 'draft' ? 'draft' : 'published';

    const imageUrl = `/uploads/gallery/${req.file.filename}`;

    const id = await insert(
      `INSERT INTO gallery
       (school_unit_id, title, description, keterangan, image_url, thumbnail_url, category, tags, uploaded_by, event_date, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        schoolUnitId,
        title,
        keteranganValue || null,
        keteranganValue || null,
        imageUrl,
        null,
        categoryValue,
        tagsValue,
        req.user.id,
        eventDateValue || null,
        statusValue
      ]
    );

    const created = await getOne(
      `SELECT g.*, su.code AS unit_code, su.name AS unit_name, up.full_name AS uploaded_by_name
       FROM gallery g
       LEFT JOIN school_units su ON su.id = g.school_unit_id
       LEFT JOIN user_profiles up ON up.user_id = g.uploaded_by
       WHERE g.id = ?`,
      [id]
    );

    res.status(201).json({
      success: true,
      data: created
        ? { ...created, image_url: normalizeDbImageUrl(created.image_url), thumbnail_url: normalizeDbImageUrl(created.thumbnail_url) }
        : created
    });
  } catch {
    if (uploadedFilePath) await safeUnlink(uploadedFilePath);
    res.status(500).json({ success: false, message: 'Gagal membuat galeri' });
  }
};

exports.updateGallery = async (req, res) => {
  const uploadedFilePath = req.file ? path.join(galleryUploadDir, req.file.filename) : null;
  try {
    const { id } = req.params;
    const existing = await getOne('SELECT * FROM gallery WHERE id = ?', [id]);
    if (!existing) {
      if (uploadedFilePath) await safeUnlink(uploadedFilePath);
      return res.status(404).json({ success: false, message: 'Galeri tidak ditemukan' });
    }

    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    if (forcedUnitCode) {
      const forcedId = await resolveSchoolUnitIdByCode(forcedUnitCode);
      if (forcedId && Number(existing.school_unit_id) !== Number(forcedId)) {
        if (uploadedFilePath) await safeUnlink(uploadedFilePath);
        return res.status(403).json({ success: false, message: 'Tidak boleh mengubah data unit lain' });
      }
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) {
        if (uploadedFilePath) await safeUnlink(uploadedFilePath);
        return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      }
      if (Number(existing.school_unit_id) !== Number(req.user.school_unit_id)) {
        if (uploadedFilePath) await safeUnlink(uploadedFilePath);
        return res.status(403).json({ success: false, message: 'Tidak boleh mengubah data unit lain' });
      }
    }

    const title = req.body?.title !== undefined ? String(req.body.title).trim() : existing.title;
    if (!title) {
      if (uploadedFilePath) await safeUnlink(uploadedFilePath);
      return res.status(400).json({ success: false, message: 'Title wajib diisi' });
    }

    const unitCode = req.body?.unit_code !== undefined ? String(req.body.unit_code || '').trim() : null;
    const { schoolUnitId } = await getEffectiveSchoolUnitId(req, unitCode === null ? null : unitCode);
    const nextSchoolUnitId = unitCode === null ? existing.school_unit_id : schoolUnitId;
    if (unitCode !== null && unitCode && !nextSchoolUnitId && !['SEMUA', 'ALL', 'YAYASAN'].includes(unitCode.toUpperCase())) {
      if (uploadedFilePath) await safeUnlink(uploadedFilePath);
      return res.status(400).json({ success: false, message: 'Unit tidak valid' });
    }

    const keteranganValue =
      req.body?.keterangan !== undefined ? String(req.body.keterangan || '').trim() : existing.keterangan || existing.description || null;
    const categoryValue =
      req.body?.category !== undefined ? (req.body.category ? String(req.body.category).trim() : null) : existing.category;
    const tagsValue =
      req.body?.tags !== undefined ? (req.body.tags ? String(req.body.tags).trim() : null) : existing.tags;
    const eventDateValue =
      req.body?.event_date !== undefined ? (req.body.event_date ? String(req.body.event_date).trim() : null) : existing.event_date;
    const statusValue =
      req.body?.status === 'draft' ? 'draft' : req.body?.status === 'published' ? 'published' : existing.status;

    const newImageUrl = req.file ? `/uploads/gallery/${req.file.filename}` : normalizeDbImageUrl(existing.image_url);

    await update(
      `UPDATE gallery SET
       school_unit_id = ?, title = ?, description = ?, keterangan = ?, image_url = ?, category = ?, tags = ?, event_date = ?, status = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        nextSchoolUnitId,
        title,
        keteranganValue || null,
        keteranganValue || null,
        newImageUrl,
        categoryValue,
        tagsValue,
        eventDateValue,
        statusValue,
        id
      ]
    );

    if (req.file && existing.image_url && existing.image_url !== newImageUrl) {
      const oldPath = getLocalFilePathFromUrl(existing.image_url);
      if (oldPath) await safeUnlink(oldPath);
    }

    const updatedRow = await getOne(
      `SELECT g.*, su.code AS unit_code, su.name AS unit_name, up.full_name AS uploaded_by_name
       FROM gallery g
       LEFT JOIN school_units su ON su.id = g.school_unit_id
       LEFT JOIN user_profiles up ON up.user_id = g.uploaded_by
       WHERE g.id = ?`,
      [id]
    );

    res.status(200).json({
      success: true,
      data: updatedRow
        ? { ...updatedRow, image_url: normalizeDbImageUrl(updatedRow.image_url), thumbnail_url: normalizeDbImageUrl(updatedRow.thumbnail_url) }
        : updatedRow
    });
  } catch {
    if (uploadedFilePath) await safeUnlink(uploadedFilePath);
    res.status(500).json({ success: false, message: 'Gagal mengupdate galeri' });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getOne('SELECT * FROM gallery WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Galeri tidak ditemukan' });

    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    if (forcedUnitCode) {
      const forcedId = await resolveSchoolUnitIdByCode(forcedUnitCode);
      if (forcedId && Number(existing.school_unit_id) !== Number(forcedId)) {
        return res.status(403).json({ success: false, message: 'Tidak boleh menghapus data unit lain' });
      }
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) {
        return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      }
      if (Number(existing.school_unit_id) !== Number(req.user.school_unit_id)) {
        return res.status(403).json({ success: false, message: 'Tidak boleh menghapus data unit lain' });
      }
    }

    const affected = await deleteRow('DELETE FROM gallery WHERE id = ?', [id]);
    if (!affected) return res.status(404).json({ success: false, message: 'Galeri tidak ditemukan' });

    const oldPath = getLocalFilePathFromUrl(existing.image_url);
    if (oldPath) await safeUnlink(oldPath);

    res.status(200).json({ success: true, message: 'Galeri berhasil dihapus' });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal menghapus galeri' });
  }
};
