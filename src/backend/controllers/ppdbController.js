const { executeQuery, getOne, insert, update } = require('../config/database');

const getSchoolUnitIdByCode = async (code) => {
  if (!code) return null;
  const row = await getOne('SELECT id FROM school_units WHERE code = ? LIMIT 1', [code]);
  return row ? Number(row.id) : null;
};

const getActiveAcademicYearId = async () => {
  const row = await getOne('SELECT id FROM academic_years WHERE is_active = 1 ORDER BY id DESC LIMIT 1');
  if (row) return Number(row.id);
  const fallback = await getOne('SELECT id FROM academic_years ORDER BY id DESC LIMIT 1');
  return fallback ? Number(fallback.id) : null;
};

const toSchemaStatus = (status) => {
  const s = String(status || '').toLowerCase();
  if (s === 'approved') return 'accepted';
  if (s === 'registered') return 'enrolled';
  if (['pending', 'verified', 'accepted', 'rejected', 'enrolled'].includes(s)) return s;
  return 'pending';
};

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

    const school_unit_id = await getSchoolUnitIdByCode(jenjang);
    if (!school_unit_id) {
      return res.status(400).json({
        success: false,
        message: 'Jenjang tidak valid'
      });
    }

    const academic_year_id = await getActiveAcademicYearId();
    if (!academic_year_id) {
      return res.status(500).json({
        success: false,
        message: 'Tahun ajaran belum disiapkan di database'
      });
    }

    // Generate unique registration number
    const tahun = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const registration_number = `PPDB${tahun}${jenjang}${randomNum}`;

    // Insert registration
    const registrationId = await insert(
      `INSERT INTO ppdb_registrations 
        (school_unit_id, academic_year_id, registration_number, full_name, nik, birth_place, birth_date, gender,
         address, phone, email, previous_school, father_name, father_occupation, mother_name, mother_occupation,
         notes, status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())`,
      [
        school_unit_id,
        academic_year_id,
        registration_number,
        nama_lengkap,
        nik || null,
        tempat_lahir || null,
        tanggal_lahir,
        jenis_kelamin,
        alamat,
        no_telp,
        email,
        asal_sekolah || null,
        nama_ayah,
        pekerjaan_ayah || null,
        nama_ibu,
        pekerjaan_ibu || null,
        [prestasi, informasi_dari].filter(Boolean).join(' | ') || null
      ]
    );

    const registration = await getOne(
      `SELECT 
         r.*,
         su.code AS jenjang,
         r.registration_number AS no_pendaftaran,
         r.full_name AS nama_lengkap,
         r.birth_place AS tempat_lahir,
         r.birth_date AS tanggal_lahir,
         r.gender AS jenis_kelamin,
         r.address AS alamat,
         r.phone AS no_telp,
         r.previous_school AS asal_sekolah
       FROM ppdb_registrations r
       LEFT JOIN school_units su ON r.school_unit_id = su.id
       WHERE r.id = ?`,
      [registrationId]
    );

    // TODO: Send confirmation email

    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil! Nomor pendaftaran Anda akan dikirim via email',
      data: {
        no_pendaftaran: registration_number,
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
      `SELECT 
         r.*,
         su.code AS jenjang,
         r.registration_number AS no_pendaftaran,
         r.full_name AS nama_lengkap,
         r.birth_place AS tempat_lahir,
         r.birth_date AS tanggal_lahir,
         r.gender AS jenis_kelamin,
         r.address AS alamat,
         r.phone AS no_telp,
         r.previous_school AS asal_sekolah
       FROM ppdb_registrations r
       LEFT JOIN school_units su ON r.school_unit_id = su.id
       WHERE r.registration_number = ?`,
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

    const offset = (Number(page) - 1) * Number(limit);
    let whereConditions = [];
    let params = [];

    // Filter by jenjang
    if (jenjang && String(jenjang).toLowerCase() !== 'semua') {
      whereConditions.push('su.code = ?');
      params.push(jenjang);
    }

    // Filter by status
    if (status) {
      whereConditions.push('r.status = ?');
      params.push(toSchemaStatus(status));
    }

    // Search
    if (search) {
      whereConditions.push('(r.full_name LIKE ? OR r.registration_number LIKE ? OR r.email LIKE ?)');
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM ppdb_registrations r LEFT JOIN school_units su ON r.school_unit_id = su.id ${whereClause}`;
    const countResult = await getOne(countQuery, params);
    const total = countResult.total;

    // Get registrations
    const allowedSortFields = ['created_at', 'nama_lengkap', 'jenjang', 'status'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const sortColumn = sortField === 'nama_lengkap'
      ? 'r.full_name'
      : sortField === 'jenjang'
        ? 'su.code'
        : `r.${sortField}`;

    const query = `
      SELECT 
        r.*,
        su.code AS jenjang,
        r.registration_number AS no_pendaftaran,
        r.full_name AS nama_lengkap,
        r.birth_place AS tempat_lahir,
        r.birth_date AS tanggal_lahir,
        r.gender AS jenis_kelamin,
        r.address AS alamat,
        r.phone AS no_telp,
        r.previous_school AS asal_sekolah
      FROM ppdb_registrations r
      LEFT JOIN school_units su ON r.school_unit_id = su.id
      ${whereClause}
      ORDER BY ${sortColumn} ${sortOrder}
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
    const validStatuses = ['pending', 'verified', 'approved', 'accepted', 'rejected', 'registered', 'enrolled'];
    if (!validStatuses.includes(String(status || '').toLowerCase())) {
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
    await update('UPDATE ppdb_registrations SET status = ?, notes = ?, updated_at = NOW() WHERE id = ?', [
      toSchemaStatus(status),
      catatan || null,
      id
    ]);

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
      `SELECT su.code AS jenjang, COUNT(*) as count
       FROM ppdb_registrations r
       LEFT JOIN school_units su ON r.school_unit_id = su.id
       GROUP BY su.code
       ORDER BY su.code`
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
