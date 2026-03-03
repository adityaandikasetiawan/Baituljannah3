const { executeQuery, getOne, insert, update } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

// @desc    Submit PPDB registration
// @route   POST /api/v1/ppdb/register
// @access  Public
exports.submitRegistration = async (req, res) => {
  try {
    const {
      // Data Siswa
      nama_lengkap,
      jenjang,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      nik,
      alamat,
      kota,
      provinsi,
      kode_pos,
      
      // Data Orang Tua
      nama_ayah,
      pekerjaan_ayah,
      nama_ibu,
      pekerjaan_ibu,
      no_telp,
      email,
      
      // Data Tambahan
      asal_sekolah,
      prestasi,
      informasi_dari
    } = req.body;

    // Generate unique registration number
    const tahun = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const no_pendaftaran = `PPDB${tahun}${jenjang}${randomNum}`;

    // Insert registration
    const registrationId = await insert(
      `INSERT INTO ppdb_registrations 
        (no_pendaftaran, nama_lengkap, jenjang, jenis_kelamin, tempat_lahir, tanggal_lahir, 
         nik, alamat, kota, provinsi, kode_pos, nama_ayah, pekerjaan_ayah, nama_ibu, 
         pekerjaan_ibu, no_telp, email, asal_sekolah, prestasi, informasi_dari, 
         status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())`,
      [
        no_pendaftaran,
        nama_lengkap,
        jenjang,
        jenis_kelamin,
        tempat_lahir,
        tanggal_lahir,
        nik || null,
        alamat,
        kota || null,
        provinsi || null,
        kode_pos || null,
        nama_ayah,
        pekerjaan_ayah || null,
        nama_ibu,
        pekerjaan_ibu || null,
        no_telp,
        email,
        asal_sekolah || null,
        prestasi || null,
        informasi_dari || null
      ]
    );

    const registration = await getOne(
      'SELECT * FROM ppdb_registrations WHERE id = ?',
      [registrationId]
    );

    // TODO: Send confirmation email

    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil! Nomor pendaftaran Anda akan dikirim via email',
      data: {
        no_pendaftaran,
        registration
      }
    });
  } catch (error) {
    console.error('Submit Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mendaftar',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get registration by number
// @route   GET /api/v1/ppdb/check/:no_pendaftaran
// @access  Public
exports.checkRegistration = async (req, res) => {
  try {
    const { no_pendaftaran } = req.params;

    const registration = await getOne(
      'SELECT * FROM ppdb_registrations WHERE no_pendaftaran = ?',
      [no_pendaftaran]
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Nomor pendaftaran tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Check Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengecek pendaftaran',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all registrations (Admin only)
// @route   GET /api/v1/ppdb/registrations
// @access  Private (Admin)
exports.getAllRegistrations = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      jenjang,
      status,
      search,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = [];
    let params = [];

    // Filter by jenjang
    if (jenjang) {
      whereConditions.push('jenjang = ?');
      params.push(jenjang);
    }

    // Filter by status
    if (status) {
      whereConditions.push('status = ?');
      params.push(status);
    }

    // Search
    if (search) {
      whereConditions.push('(nama_lengkap LIKE ? OR no_pendaftaran LIKE ? OR email LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM ppdb_registrations ${whereClause}`;
    const countResult = await getOne(countQuery, params);
    const total = countResult.total;

    // Get registrations
    const allowedSortFields = ['created_at', 'nama_lengkap', 'jenjang', 'status'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const query = `
      SELECT * FROM ppdb_registrations
      ${whereClause}
      ORDER BY ${sortField} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const registrations = await executeQuery(query, [...params, parseInt(limit), offset]);

    res.status(200).json({
      success: true,
      count: registrations.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: registrations
    });
  } catch (error) {
    console.error('Get All Registrations Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data pendaftaran',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update registration status
// @route   PUT /api/v1/ppdb/registrations/:id/status
// @access  Private (Admin)
exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, catatan } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status wajib diisi'
      });
    }

    // Validate status
    const validStatuses = ['pending', 'verified', 'approved', 'rejected', 'registered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid'
      });
    }

    // Check if registration exists
    const registration = await getOne(
      'SELECT * FROM ppdb_registrations WHERE id = ?',
      [id]
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Pendaftaran tidak ditemukan'
      });
    }

    // Update status
    await update(
      'UPDATE ppdb_registrations SET status = ?, catatan = ?, updated_at = NOW() WHERE id = ?',
      [status, catatan || null, id]
    );

    // Get updated registration
    const updatedRegistration = await getOne(
      'SELECT * FROM ppdb_registrations WHERE id = ?',
      [id]
    );

    // TODO: Send status update email

    res.status(200).json({
      success: true,
      message: 'Status pendaftaran berhasil diupdate',
      data: updatedRegistration
    });
  } catch (error) {
    console.error('Update Registration Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get PPDB statistics
// @route   GET /api/v1/ppdb/statistics
// @access  Private (Admin)
exports.getStatistics = async (req, res) => {
  try {
    // Total registrations
    const totalResult = await getOne('SELECT COUNT(*) as total FROM ppdb_registrations');
    
    // By jenjang
    const byJenjang = await executeQuery(
      'SELECT jenjang, COUNT(*) as count FROM ppdb_registrations GROUP BY jenjang'
    );
    
    // By status
    const byStatus = await executeQuery(
      'SELECT status, COUNT(*) as count FROM ppdb_registrations GROUP BY status'
    );
    
    // Recent registrations (last 7 days)
    const recentResult = await getOne(
      'SELECT COUNT(*) as count FROM ppdb_registrations WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );

    res.status(200).json({
      success: true,
      data: {
        total: totalResult.total,
        byJenjang,
        byStatus,
        recentRegistrations: recentResult.count
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
