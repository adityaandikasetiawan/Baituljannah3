const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');

const allowedPageKeys = new Set(['home', 'profil', 'kurikulum', 'guru-staff', 'kontak']);

const normalizePageKey = (value) => {
  const key = String(value || '').trim().toLowerCase();
  return key;
};

const normalizeUnitCode = (value) => {
  const code = String(value || '').trim().toUpperCase();
  if (!code || code === 'SEMUA' || code === 'ALL' || code === 'YAYASAN') return null;
  return code;
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

const resolveSchoolUnitIdByCode = async (unitCode) => {
  const code = normalizeUnitCode(unitCode);
  if (!code) return null;
  const row = await getOne('SELECT id FROM school_units WHERE code = ? LIMIT 1', [code]);
  return row ? Number(row.id) : null;
};

const ensureUnitPagesTable = async () => {
  await executeQuery(
    `CREATE TABLE IF NOT EXISTS unit_page_contents (
      id INT AUTO_INCREMENT PRIMARY KEY,
      school_unit_id INT NOT NULL,
      page_key VARCHAR(50) NOT NULL,
      status ENUM('draft','published') DEFAULT 'published',
      content_json LONGTEXT NOT NULL,
      updated_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uq_unit_page (school_unit_id, page_key),
      INDEX idx_page_key (page_key),
      INDEX idx_unit (school_unit_id),
      FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE CASCADE,
      FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
  );
};

const getEffectiveSchoolUnitId = async (req, bodyOrQueryUnitCode) => {
  const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
  if (forcedUnitCode) {
    const id = await resolveSchoolUnitIdByCode(forcedUnitCode);
    return { schoolUnitId: id, unitCode: forcedUnitCode, forced: true };
  }

  if (req.user?.role_raw === 'admin_unit') {
    const id = req.user.school_unit_id;
    return { schoolUnitId: id == null ? null : Number(id), unitCode: null, forced: true };
  }

  const unitCode = normalizeUnitCode(bodyOrQueryUnitCode);
  const id = await resolveSchoolUnitIdByCode(unitCode);
  return { schoolUnitId: id, unitCode, forced: false };
};

const parseJsonBody = (value) => {
  if (value == null) return null;
  if (typeof value === 'object') return value;
  if (typeof value !== 'string') return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

exports.getUnitPagePublic = async (req, res) => {
  try {
    await ensureUnitPagesTable();
    const unitCode = normalizeUnitCode(req.query.unit_code);
    const pageKey = normalizePageKey(req.query.page_key);
    if (!unitCode || !pageKey) {
      return res.status(400).json({ success: false, message: 'unit_code dan page_key wajib diisi' });
    }
    if (!allowedPageKeys.has(pageKey)) {
      return res.status(400).json({ success: false, message: 'page_key tidak valid' });
    }

    const row = await getOne(
      `SELECT upc.page_key, upc.status, upc.content_json, su.code AS unit_code, upc.updated_at
       FROM unit_page_contents upc
       JOIN school_units su ON su.id = upc.school_unit_id
       WHERE su.code = ? AND upc.page_key = ? AND upc.status = 'published'
       LIMIT 1`,
      [unitCode, pageKey]
    );

    if (!row) return res.status(200).json({ success: true, data: null });
    const parsed = parseJsonBody(row.content_json);
    return res.status(200).json({
      success: true,
      data: {
        unit_code: row.unit_code,
        page_key: row.page_key,
        status: row.status,
        updated_at: row.updated_at,
        content: parsed || {},
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal mengambil konten halaman' });
  }
};

exports.getUnitPagesManage = async (req, res) => {
  try {
    await ensureUnitPagesTable();
    const pageKey = req.query.page_key ? normalizePageKey(req.query.page_key) : null;
    if (pageKey && !allowedPageKeys.has(pageKey)) {
      return res.status(400).json({ success: false, message: 'page_key tidak valid' });
    }

    const { schoolUnitId, unitCode } = await getEffectiveSchoolUnitId(req, req.query.unit_code);
    if (!schoolUnitId) {
      return res.status(400).json({ success: false, message: 'unit_code wajib diisi (atau akses via subdomain unit)' });
    }

    const rows = await executeQuery(
      `SELECT upc.page_key, upc.status, upc.content_json, su.code AS unit_code, upc.updated_at
       FROM unit_page_contents upc
       JOIN school_units su ON su.id = upc.school_unit_id
       WHERE upc.school_unit_id = ? ${pageKey ? 'AND upc.page_key = ?' : ''}
       ORDER BY upc.page_key ASC`,
      pageKey ? [schoolUnitId, pageKey] : [schoolUnitId]
    );

    const data = rows.map((r) => ({
      unit_code: r.unit_code,
      page_key: r.page_key,
      status: r.status,
      updated_at: r.updated_at,
      content: parseJsonBody(r.content_json) || {},
    }));

    return res.status(200).json({ success: true, data, meta: { unit_code: unitCode || null } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal mengambil konten halaman (admin)' });
  }
};

exports.upsertUnitPage = async (req, res) => {
  try {
    await ensureUnitPagesTable();
    const pageKey = normalizePageKey(req.params.page_key);
    if (!allowedPageKeys.has(pageKey)) {
      return res.status(400).json({ success: false, message: 'page_key tidak valid' });
    }

    const bodyUnitCode = req.body?.unit_code || req.body?.unit_sekolah || req.body?.unit;
    const { schoolUnitId } = await getEffectiveSchoolUnitId(req, bodyUnitCode);
    if (!schoolUnitId) {
      return res.status(400).json({ success: false, message: 'unit_code wajib diisi (atau akses via subdomain unit)' });
    }

    const status = String(req.body?.status || 'published').toLowerCase() === 'draft' ? 'draft' : 'published';
    const content = req.body?.content;
    const parsed = parseJsonBody(content);
    if (!parsed || typeof parsed !== 'object') {
      return res.status(400).json({ success: false, message: 'content harus berupa JSON object' });
    }

    const serialized = JSON.stringify(parsed);
    const existing = await getOne(
      'SELECT id FROM unit_page_contents WHERE school_unit_id = ? AND page_key = ? LIMIT 1',
      [schoolUnitId, pageKey]
    );

    if (existing?.id) {
      await update(
        'UPDATE unit_page_contents SET status = ?, content_json = ?, updated_by = ? WHERE id = ?',
        [status, serialized, req.user?.id || null, Number(existing.id)]
      );
    } else {
      await insert(
        'INSERT INTO unit_page_contents (school_unit_id, page_key, status, content_json, updated_by) VALUES (?,?,?,?,?)',
        [schoolUnitId, pageKey, status, serialized, req.user?.id || null]
      );
    }

    return res.status(200).json({ success: true, message: 'Konten halaman berhasil disimpan' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menyimpan konten halaman' });
  }
};

exports.deleteUnitPage = async (req, res) => {
  try {
    await ensureUnitPagesTable();
    const pageKey = normalizePageKey(req.params.page_key);
    if (!allowedPageKeys.has(pageKey)) {
      return res.status(400).json({ success: false, message: 'page_key tidak valid' });
    }

    const bodyUnitCode = req.body?.unit_code || req.query?.unit_code || null;
    const { schoolUnitId } = await getEffectiveSchoolUnitId(req, bodyUnitCode);
    if (!schoolUnitId) {
      return res.status(400).json({ success: false, message: 'unit_code wajib diisi (atau akses via subdomain unit)' });
    }

    const affected = await deleteRow('DELETE FROM unit_page_contents WHERE school_unit_id = ? AND page_key = ?', [
      schoolUnitId,
      pageKey,
    ]);
    return res.status(200).json({ success: true, deleted: affected });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Gagal menghapus konten halaman' });
  }
};

