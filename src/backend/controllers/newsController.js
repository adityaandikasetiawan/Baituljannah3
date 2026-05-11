const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');

const slugify = (value) => {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const getSchoolUnitIdByCode = async (code) => {
  if (!code || String(code).toLowerCase() === 'semua') return null;
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

const ensureUniqueSlug = async (base, excludeId) => {
  const cleaned = slugify(base) || `news-${Date.now()}`;
  const params = excludeId ? [cleaned, excludeId] : [cleaned];
  const where = excludeId ? 'slug = ? AND id <> ?' : 'slug = ?';
  const existing = await getOne(`SELECT id FROM news WHERE ${where} LIMIT 1`, params);
  if (!existing) return cleaned;
  return `${cleaned}-${Date.now()}`;
};

const toResponseRow = (row) => {
  if (!row) return row;
  return {
    ...row,
    unit_sekolah: row.unit_sekolah || 'Semua',
    image_url: row.image_url || null,
    publish_date: row.publish_date || null,
  };
};

const buildSort = (sort, order) => {
  const allowed = ['created_at', 'title', 'views', 'publish_date'];
  const safeSort = allowed.includes(sort) ? sort : 'created_at';
  const safeOrder = String(order || '').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
  const column = safeSort === 'publish_date' ? 'n.published_at' : `n.${safeSort}`;
  return { column, order: safeOrder };
};

// @desc    Get all news
// @route   GET /api/v1/news
// @access  Public
exports.getAllNews = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, unit_sekolah, search, sort = 'created_at', order = 'DESC' } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const whereConditions = ['n.status = "published"'];
    const params = [];

    if (category) {
      whereConditions.push('n.category = ?');
      params.push(category);
    }

    if (unit_sekolah && String(unit_sekolah).toLowerCase() !== 'semua') {
      whereConditions.push('su.code = ?');
      params.push(unit_sekolah);
    }

    if (search) {
      whereConditions.push('(n.title LIKE ? OR n.content LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const countResult = await getOne(
      `SELECT COUNT(*) as total
       FROM news n
       LEFT JOIN school_units su ON n.school_unit_id = su.id
       ${whereClause}`,
      params
    );

    const { column, order: sortOrder } = buildSort(sort, order);

    const rows = await executeQuery(
      `SELECT 
         n.id,
         n.title,
         n.content,
         n.category,
         COALESCE(su.code, 'Semua') AS unit_sekolah,
         n.featured_image AS image_url,
         n.published_at AS publish_date,
         n.created_at,
         n.updated_at,
         n.status,
         n.views,
         COALESCE(up.full_name, u.username) AS author_name
       FROM news n
       LEFT JOIN school_units su ON n.school_unit_id = su.id
       LEFT JOIN users u ON n.author_id = u.id
       LEFT JOIN user_profiles up ON up.user_id = u.id
       ${whereClause}
       ORDER BY ${column} ${sortOrder}
       LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      total: Number(countResult?.total || 0),
      totalPages: Math.ceil(Number(countResult?.total || 0) / Number(limit)),
      currentPage: Number(page),
      data: rows.map(toResponseRow),
    });
  } catch (error) {
    console.error('Get All News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Get all news (including drafts) for admin/guru
// @route   GET /api/v1/news/manage
// @access  Private (Admin, Guru)
exports.getAllNewsManage = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, unit_sekolah, status, search, sort = 'created_at', order = 'DESC' } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    const whereConditions = [];
    const params = [];

    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    if (forcedUnitCode) {
      whereConditions.push('su.code = ?');
      params.push(forcedUnitCode);
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) {
        return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      }
      whereConditions.push('n.school_unit_id = ?');
      params.push(Number(req.user.school_unit_id));
    }

    if (category) {
      whereConditions.push('n.category = ?');
      params.push(category);
    }

    if (!forcedUnitCode && req.user?.role_raw !== 'admin_unit' && unit_sekolah && String(unit_sekolah).toLowerCase() !== 'semua') {
      whereConditions.push('su.code = ?');
      params.push(unit_sekolah);
    }

    if (status) {
      whereConditions.push('n.status = ?');
      params.push(status);
    }

    if (search) {
      whereConditions.push('(n.title LIKE ? OR n.content LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const countResult = await getOne(
      `SELECT COUNT(*) as total
       FROM news n
       LEFT JOIN school_units su ON n.school_unit_id = su.id
       ${whereClause}`,
      params
    );

    const { column, order: sortOrder } = buildSort(sort, order);

    const rows = await executeQuery(
      `SELECT 
         n.id,
         n.title,
         n.content,
         n.category,
         COALESCE(su.code, 'Semua') AS unit_sekolah,
         n.featured_image AS image_url,
         n.published_at AS publish_date,
         n.created_at,
         n.updated_at,
         n.status,
         n.views,
         COALESCE(up.full_name, u.username) AS author_name
       FROM news n
       LEFT JOIN school_units su ON n.school_unit_id = su.id
       LEFT JOIN users u ON n.author_id = u.id
       LEFT JOIN user_profiles up ON up.user_id = u.id
       ${whereClause}
       ORDER BY ${column} ${sortOrder}
       LIMIT ? OFFSET ?`,
      [...params, Number(limit), offset]
    );

    res.status(200).json({
      success: true,
      count: rows.length,
      total: Number(countResult?.total || 0),
      totalPages: Math.ceil(Number(countResult?.total || 0) / Number(limit)),
      currentPage: Number(page),
      data: rows.map(toResponseRow),
    });
  } catch (error) {
    console.error('Get All News Manage Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data berita (admin)',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Get single news by ID
// @route   GET /api/v1/news/:id
// @access  Public
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const row = await getOne(
      `SELECT 
         n.*,
         COALESCE(su.code, 'Semua') AS unit_sekolah,
         n.featured_image AS image_url,
         n.published_at AS publish_date,
         COALESCE(up.full_name, u.username) AS author_name,
         u.email AS author_email
       FROM news n
       LEFT JOIN school_units su ON n.school_unit_id = su.id
       LEFT JOIN users u ON n.author_id = u.id
       LEFT JOIN user_profiles up ON up.user_id = u.id
       WHERE n.id = ?`,
      [id]
    );

    if (!row) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
    }

    await update('UPDATE news SET views = views + 1 WHERE id = ?', [id]);
    row.views = Number(row.views || 0) + 1;

    res.status(200).json({ success: true, data: toResponseRow(row) });
  } catch (error) {
    console.error('Get News By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Create news
// @route   POST /api/v1/news
// @access  Private (Admin, Guru)
exports.createNews = async (req, res) => {
  try {
    const { title, content, category, unit_sekolah = 'Semua', image_url, status = 'draft', publish_date } = req.body;

    const slug = await ensureUniqueSlug(title, null);
    const excerpt = String(content || '').length > 200 ? `${String(content).slice(0, 200)}...` : String(content || '');
    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    let schoolUnitId = await getSchoolUnitIdByCode(unit_sekolah);
    if (forcedUnitCode) {
      schoolUnitId = await getSchoolUnitIdByCode(forcedUnitCode);
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      schoolUnitId = Number(req.user.school_unit_id);
    }
    const publishedAt = status === 'published' ? (publish_date ? new Date(publish_date) : new Date()) : null;

    const newsId = await insert(
      `INSERT INTO news 
        (school_unit_id, title, slug, excerpt, content, featured_image, author_id, category, views, is_featured, status, published_at, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?, NOW(), NOW())`,
      [
        schoolUnitId,
        title,
        slug,
        excerpt || null,
        content,
        image_url || null,
        req.user.id,
        category || null,
        status,
        publishedAt,
      ]
    );

    const row = await getOne(
      `SELECT 
         n.*,
         COALESCE(su.code, 'Semua') AS unit_sekolah,
         n.featured_image AS image_url,
         n.published_at AS publish_date,
         COALESCE(up.full_name, u.username) AS author_name
       FROM news n
       LEFT JOIN school_units su ON n.school_unit_id = su.id
       LEFT JOIN users u ON n.author_id = u.id
       LEFT JOIN user_profiles up ON up.user_id = u.id
       WHERE n.id = ?`,
      [newsId]
    );

    res.status(201).json({ success: true, message: 'Berita berhasil dibuat', data: toResponseRow(row) });
  } catch (error) {
    console.error('Create News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Update news
// @route   PUT /api/v1/news/:id
// @access  Private (Admin, Author)
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, unit_sekolah, image_url, status, publish_date } = req.body;

    const existing = await getOne('SELECT id, author_id, school_unit_id, title, status, published_at FROM news WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });

    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    if (forcedUnitCode) {
      const forcedId = await getSchoolUnitIdByCode(forcedUnitCode);
      if (forcedId && Number(existing.school_unit_id) !== Number(forcedId)) {
        return res.status(403).json({ success: false, message: 'Tidak boleh mengubah data unit lain' });
      }
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      if (Number(existing.school_unit_id) !== Number(req.user.school_unit_id)) {
        return res.status(403).json({ success: false, message: 'Tidak boleh mengubah data unit lain' });
      }
    }

    if (req.user.role !== 'admin' && Number(existing.author_id) !== Number(req.user.id)) {
      return res.status(403).json({ success: false, message: 'Anda tidak memiliki akses untuk mengupdate berita ini' });
    }

    const updates = [];
    const params = [];

    if (title) {
      updates.push('title = ?');
      params.push(title);
      const slug = await ensureUniqueSlug(title, id);
      updates.push('slug = ?');
      params.push(slug);
    }
    if (content) {
      updates.push('content = ?');
      params.push(content);
      const excerpt = String(content).length > 200 ? `${String(content).slice(0, 200)}...` : String(content);
      updates.push('excerpt = ?');
      params.push(excerpt || null);
    }
    if (category !== undefined) {
      updates.push('category = ?');
      params.push(category || null);
    }
    if (unit_sekolah !== undefined) {
      let schoolUnitId = await getSchoolUnitIdByCode(unit_sekolah);
      if (forcedUnitCode) {
        schoolUnitId = await getSchoolUnitIdByCode(forcedUnitCode);
      } else if (req.user?.role_raw === 'admin_unit') {
        schoolUnitId = req.user.school_unit_id == null ? null : Number(req.user.school_unit_id);
      }
      updates.push('school_unit_id = ?');
      params.push(schoolUnitId);
    }
    if (image_url !== undefined) {
      updates.push('featured_image = ?');
      params.push(image_url || null);
    }
    if (status) {
      updates.push('status = ?');
      params.push(status);

      const nextPublishedAt = status === 'published'
        ? (publish_date ? new Date(publish_date) : existing.published_at || new Date())
        : null;

      updates.push('published_at = ?');
      params.push(nextPublishedAt);
    } else if (publish_date !== undefined) {
      updates.push('published_at = ?');
      params.push(publish_date ? new Date(publish_date) : null);
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: 'Tidak ada data yang diupdate' });
    }

    params.push(id);
    await update(`UPDATE news SET ${updates.join(', ')}, updated_at = NOW() WHERE id = ?`, params);

    const row = await getOne(
      `SELECT 
         n.*,
         COALESCE(su.code, 'Semua') AS unit_sekolah,
         n.featured_image AS image_url,
         n.published_at AS publish_date,
         COALESCE(up.full_name, u.username) AS author_name
       FROM news n
       LEFT JOIN school_units su ON n.school_unit_id = su.id
       LEFT JOIN users u ON n.author_id = u.id
       LEFT JOIN user_profiles up ON up.user_id = u.id
       WHERE n.id = ?`,
      [id]
    );

    res.status(200).json({ success: true, message: 'Berita berhasil diupdate', data: toResponseRow(row) });
  } catch (error) {
    console.error('Update News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Delete news
// @route   DELETE /api/v1/news/:id
// @access  Private (Admin)
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const row = await getOne('SELECT id, school_unit_id FROM news WHERE id = ?', [id]);
    if (!row) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });

    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    if (forcedUnitCode) {
      const forcedId = await getSchoolUnitIdByCode(forcedUnitCode);
      if (forcedId && Number(row.school_unit_id) !== Number(forcedId)) {
        return res.status(403).json({ success: false, message: 'Tidak boleh menghapus data unit lain' });
      }
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      if (Number(row.school_unit_id) !== Number(req.user.school_unit_id)) {
        return res.status(403).json({ success: false, message: 'Tidak boleh menghapus data unit lain' });
      }
    }

    await deleteRow('DELETE FROM news WHERE id = ?', [id]);
    res.status(200).json({ success: true, message: 'Berita berhasil dihapus', data: {} });
  } catch (error) {
    console.error('Delete News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Get latest news
// @route   GET /api/v1/news/latest
// @access  Public
exports.getLatestNews = async (req, res) => {
  try {
    const { limit = 5, unit_sekolah } = req.query;
    const whereConditions = ['n.status = "published"'];
    const params = [];

    if (unit_sekolah && String(unit_sekolah).toLowerCase() !== 'semua') {
      whereConditions.push('su.code = ?');
      params.push(unit_sekolah);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    const rows = await executeQuery(
      `SELECT 
         n.id,
         n.title,
         n.content,
         n.category,
         COALESCE(su.code, 'Semua') AS unit_sekolah,
         n.featured_image AS image_url,
         n.published_at AS publish_date,
         n.created_at,
         n.updated_at,
         n.status,
         n.views,
         COALESCE(up.full_name, u.username) AS author_name
       FROM news n
       LEFT JOIN school_units su ON n.school_unit_id = su.id
       LEFT JOIN users u ON n.author_id = u.id
       LEFT JOIN user_profiles up ON up.user_id = u.id
       ${whereClause}
       ORDER BY n.published_at DESC, n.created_at DESC
       LIMIT ?`,
      [...params, Number(limit)]
    );

    res.status(200).json({ success: true, count: rows.length, data: rows.map(toResponseRow) });
  } catch (error) {
    console.error('Get Latest News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil berita terbaru',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
