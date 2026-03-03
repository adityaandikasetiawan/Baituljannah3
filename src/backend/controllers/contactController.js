const { executeQuery, getOne, insert, update } = require('../config/database');

// @desc    Submit contact form
// @route   POST /api/v1/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, unit_sekolah } = req.body;

    const contactId = await insert(
      `INSERT INTO contact_messages 
        (name, email, phone, subject, message, unit_sekolah, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, 'unread', NOW())`,
      [name, email, phone, subject, message, unit_sekolah || 'Umum']
    );

    const contact = await getOne(
      'SELECT * FROM contact_messages WHERE id = ?',
      [contactId]
    );

    // TODO: Send notification email to admin
    // TODO: Send auto-reply to user

    res.status(201).json({
      success: true,
      message: 'Pesan Anda berhasil terkirim. Kami akan segera menghubungi Anda',
      data: contact
    });
  } catch (error) {
    console.error('Submit Contact Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengirim pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/v1/contact
// @access  Private (Admin)
exports.getAllMessages = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      unit_sekolah,
      search,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = [];
    let params = [];

    // Filter by status
    if (status) {
      whereConditions.push('status = ?');
      params.push(status);
    }

    // Filter by unit sekolah
    if (unit_sekolah) {
      whereConditions.push('unit_sekolah = ?');
      params.push(unit_sekolah);
    }

    // Search
    if (search) {
      whereConditions.push('(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM contact_messages ${whereClause}`;
    const countResult = await getOne(countQuery, params);
    const total = countResult.total;

    // Get messages
    const allowedSortFields = ['created_at', 'name', 'status'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const query = `
      SELECT * FROM contact_messages
      ${whereClause}
      ORDER BY ${sortField} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const messages = await executeQuery(query, [...params, parseInt(limit), offset]);

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: messages
    });
  } catch (error) {
    console.error('Get All Messages Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single message
// @route   GET /api/v1/contact/:id
// @access  Private (Admin)
exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await getOne(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Pesan tidak ditemukan'
      });
    }

    // Mark as read if unread
    if (message.status === 'unread') {
      await update(
        'UPDATE contact_messages SET status = "read", read_at = NOW() WHERE id = ?',
        [id]
      );
      message.status = 'read';
      message.read_at = new Date();
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Get Message By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update message status
// @route   PUT /api/v1/contact/:id/status
// @access  Private (Admin)
exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reply } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status wajib diisi'
      });
    }

    // Validate status
    const validStatuses = ['unread', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid'
      });
    }

    // Check if message exists
    const message = await getOne(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Pesan tidak ditemukan'
      });
    }

    // Update status
    let updateQuery = 'UPDATE contact_messages SET status = ?';
    let params = [status];

    if (reply) {
      updateQuery += ', reply = ?, replied_at = NOW()';
      params.push(reply);
    }

    if (status === 'read' && !message.read_at) {
      updateQuery += ', read_at = NOW()';
    }

    updateQuery += ' WHERE id = ?';
    params.push(id);

    await update(updateQuery, params);

    // Get updated message
    const updatedMessage = await getOne(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );

    // TODO: If replied, send reply email to user

    res.status(200).json({
      success: true,
      message: 'Status pesan berhasil diupdate',
      data: updatedMessage
    });
  } catch (error) {
    console.error('Update Message Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/v1/contact/:id
// @access  Private (Admin)
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if message exists
    const message = await getOne(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Pesan tidak ditemukan'
      });
    }

    await executeQuery('DELETE FROM contact_messages WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Pesan berhasil dihapus',
      data: {}
    });
  } catch (error) {
    console.error('Delete Message Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/v1/contact/statistics
// @access  Private (Admin)
exports.getStatistics = async (req, res) => {
  try {
    // Total messages
    const totalResult = await getOne('SELECT COUNT(*) as total FROM contact_messages');
    
    // By status
    const byStatus = await executeQuery(
      'SELECT status, COUNT(*) as count FROM contact_messages GROUP BY status'
    );
    
    // By unit sekolah
    const byUnit = await executeQuery(
      'SELECT unit_sekolah, COUNT(*) as count FROM contact_messages GROUP BY unit_sekolah'
    );
    
    // Unread count
    const unreadResult = await getOne(
      'SELECT COUNT(*) as count FROM contact_messages WHERE status = "unread"'
    );

    // Recent messages (last 7 days)
    const recentResult = await getOne(
      'SELECT COUNT(*) as count FROM contact_messages WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );

    res.status(200).json({
      success: true,
      data: {
        total: totalResult.total,
        unread: unreadResult.count,
        byStatus,
        byUnit,
        recentMessages: recentResult.count
      }
    });
  } catch (error) {
    console.error('Get Statistics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil statistik',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
