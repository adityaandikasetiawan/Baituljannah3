const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');

// @desc    Get all news
// @route   GET /api/v1/news
// @access  Public
exports.getAllNews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      unit_sekolah,
      search,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = ['status = "published"'];
    let params = [];

    // Filter by category
    if (category) {
      whereConditions.push('category = ?');
      params.push(category);
    }

    // Filter by unit sekolah
    if (unit_sekolah) {
      whereConditions.push('(unit_sekolah = ? OR unit_sekolah = "Semua")');
      params.push(unit_sekolah);
    }

    // Search
    if (search) {
      whereConditions.push('(title LIKE ? OR content LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM news ${whereClause}`;
    const countResult = await getOne(countQuery, params);
    const total = countResult.total;

    // Get news
    const allowedSortFields = ['created_at', 'title', 'views', 'publish_date'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const query = `
      SELECT 
        n.*,
        u.full_name as author_name
      FROM news n
      LEFT JOIN users u ON n.author_id = u.id
      ${whereClause}
      ORDER BY ${sortField} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const news = await executeQuery(query, [...params, parseInt(limit), offset]);

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: news
    });
  } catch (error) {
    console.error('Get All News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single news by ID
// @route   GET /api/v1/news/:id
// @access  Public
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await getOne(
      `SELECT 
        n.*,
        u.full_name as author_name,
        u.email as author_email
      FROM news n
      LEFT JOIN users u ON n.author_id = u.id
      WHERE n.id = ?`,
      [id]
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    // Increment views
    await update('UPDATE news SET views = views + 1 WHERE id = ?', [id]);
    news.views += 1;

    res.status(200).json({
      success: true,
      data: news
    });
  } catch (error) {
    console.error('Get News By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create news
// @route   POST /api/v1/news
// @access  Private (Admin, Guru)
exports.createNews = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      unit_sekolah = 'Semua',
      image_url,
      status = 'draft',
      publish_date
    } = req.body;

    const newsId = await insert(
      `INSERT INTO news 
        (title, content, category, unit_sekolah, image_url, author_id, status, publish_date, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        title,
        content,
        category,
        unit_sekolah,
        image_url || null,
        req.user.id,
        status,
        publish_date || null
      ]
    );

    const news = await getOne('SELECT * FROM news WHERE id = ?', [newsId]);

    res.status(201).json({
      success: true,
      message: 'Berita berhasil dibuat',
      data: news
    });
  } catch (error) {
    console.error('Create News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update news
// @route   PUT /api/v1/news/:id
// @access  Private (Admin, Author)
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      category,
      unit_sekolah,
      image_url,
      status,
      publish_date
    } = req.body;

    // Check if news exists
    const existingNews = await getOne('SELECT * FROM news WHERE id = ?', [id]);

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    // Check authorization (only author or admin can update)
    if (req.user.role !== 'admin' && existingNews.author_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk mengupdate berita ini'
      });
    }

    const fieldsToUpdate = {};
    if (title) fieldsToUpdate.title = title;
    if (content) fieldsToUpdate.content = content;
    if (category) fieldsToUpdate.category = category;
    if (unit_sekolah) fieldsToUpdate.unit_sekolah = unit_sekolah;
    if (image_url !== undefined) fieldsToUpdate.image_url = image_url;
    if (status) fieldsToUpdate.status = status;
    if (publish_date !== undefined) fieldsToUpdate.publish_date = publish_date;

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada data yang diupdate'
      });
    }

    // Build update query
    const updateFields = Object.keys(fieldsToUpdate)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(fieldsToUpdate), id];

    await update(
      `UPDATE news SET ${updateFields}, updated_at = NOW() WHERE id = ?`,
      values
    );

    // Get updated news
    const updatedNews = await getOne('SELECT * FROM news WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Berita berhasil diupdate',
      data: updatedNews
    });
  } catch (error) {
    console.error('Update News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete news
// @route   DELETE /api/v1/news/:id
// @access  Private (Admin)
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if news exists
    const news = await getOne('SELECT * FROM news WHERE id = ?', [id]);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    await deleteRow('DELETE FROM news WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Berita berhasil dihapus',
      data: {}
    });
  } catch (error) {
    console.error('Delete News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get latest news
// @route   GET /api/v1/news/latest
// @access  Public
exports.getLatestNews = async (req, res) => {
  try {
    const { limit = 5, unit_sekolah } = req.query;

    let whereClause = 'WHERE status = "published"';
    let params = [];

    if (unit_sekolah) {
      whereClause += ' AND (unit_sekolah = ? OR unit_sekolah = "Semua")';
      params.push(unit_sekolah);
    }

    const news = await executeQuery(
      `SELECT 
        n.*,
        u.full_name as author_name
      FROM news n
      LEFT JOIN users u ON n.author_id = u.id
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ?`,
      [...params, parseInt(limit)]
    );

    res.status(200).json({
      success: true,
      count: news.length,
      data: news
    });
  } catch (error) {
    console.error('Get Latest News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil berita terbaru',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
