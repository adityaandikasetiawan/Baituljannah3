const { executeQuery, getOne, insert, update } = require('../config/database');

let ppdbColumnsCache = null;
let ppdbColumnsCacheAt = 0;

const getPpdbColumns = async () => {
  const now = Date.now();
  if (ppdbColumnsCache && now - ppdbColumnsCacheAt < 5 * 60 * 1000) return ppdbColumnsCache;
  const rows = await executeQuery('SHOW COLUMNS FROM ppdb_registrations');
  const cols = new Set(rows.map((r) => String(r.Field || '').toLowerCase()).filter(Boolean));
  ppdbColumnsCache = cols;
  ppdbColumnsCacheAt = now;
  return cols;
};

const ensurePpdbFormJsonColumn = async () => {
  try {
    const cols = await getPpdbColumns();
    if (cols.has('form_json')) return;
    await executeQuery('ALTER TABLE ppdb_registrations ADD COLUMN form_json LONGTEXT');
    ppdbColumnsCache = null;
    ppdbColumnsCacheAt = 0;
  } catch {}
};

const getSchoolUnitIdByCode = async (code) => {
  if (!code) return null;
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
    await ensurePpdbFormJsonColumn();
    const rawBody = req.body && typeof req.body === 'object' ? req.body : {};
    const {
      // Data Siswa
      nama_lengkap,
      jenjang,
      jenis_kelamin,
      tempat_lahir,
      tanggal_lahir,
      nik,
      nisn,
      agama,
      alamat,
      kota,
      provinsi,
      kode_pos,
      
      // Data Orang Tua
      nama_ayah,
      pekerjaan_ayah,
      nama_ibu,
      pekerjaan_ibu,
      no_hp_ayah,
      no_hp_ibu,
      no_telp,
      email,
      
      // Data Tambahan
      asal_sekolah,
      prestasi,
      informasi_dari,
      form_data
    } = req.body;

    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    const effectiveJenjang = forcedUnitCode || jenjang;
    const school_unit_id = await getSchoolUnitIdByCode(effectiveJenjang);
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
    const registration_number = `PPDB${tahun}${effectiveJenjang}${randomNum}`;

    const cols = await getPpdbColumns();
    const columns = [
      'school_unit_id',
      'academic_year_id',
      'registration_number',
      'full_name',
      'nik',
      'birth_place',
      'birth_date',
      'gender',
      'address',
      'phone',
      'email',
      'previous_school',
      'father_name',
      'father_occupation',
      'father_phone',
      'mother_name',
      'mother_occupation',
      'mother_phone',
      'religion',
      'nisn',
      'notes',
      'status',
      'created_at',
      'updated_at',
    ].filter((c) => cols.has(String(c).toLowerCase()));

    const fullForm = form_data && typeof form_data === 'object' ? form_data : rawBody;
    const formJson = cols.has('form_json') ? JSON.stringify(fullForm) : null;
    if (cols.has('form_json')) columns.push('form_json');

    const valuesByColumn = {
      school_unit_id,
      academic_year_id,
      registration_number,
      full_name: nama_lengkap,
      nik: nik || null,
      birth_place: tempat_lahir || null,
      birth_date: tanggal_lahir,
      gender: jenis_kelamin,
      address: alamat,
      phone: no_telp,
      email,
      previous_school: asal_sekolah || null,
      father_name: nama_ayah,
      father_occupation: pekerjaan_ayah || null,
      father_phone: no_hp_ayah || null,
      mother_name: nama_ibu,
      mother_occupation: pekerjaan_ibu || null,
      mother_phone: no_hp_ibu || null,
      religion: agama || 'Islam',
      nisn: nisn || null,
      notes: [prestasi, informasi_dari].filter(Boolean).join(' | ') || null,
      status: 'pending',
      form_json: formJson,
    };

    const placeholders = columns
      .map((c) => {
        if (c === 'created_at') return 'NOW()';
        if (c === 'updated_at') return 'NOW()';
        return '?';
      })
      .join(', ');
    const params = columns
      .filter((c) => c !== 'created_at' && c !== 'updated_at')
      .map((c) => valuesByColumn[c]);

    const registrationId = await insert(
      `INSERT INTO ppdb_registrations (${columns.join(', ')}) VALUES (${placeholders})`,
      params
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

    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    if (forcedUnitCode) {
      whereConditions.push('su.code = ?');
      params.push(forcedUnitCode);
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) {
        return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      }
      whereConditions.push('r.school_unit_id = ?');
      params.push(Number(req.user.school_unit_id));
    }

    // Filter by jenjang
    if (!forcedUnitCode && req.user?.role_raw !== 'admin_unit' && jenjang && String(jenjang).toLowerCase() !== 'semua') {
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

    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    if (forcedUnitCode) {
      const forcedId = await getSchoolUnitIdByCode(forcedUnitCode);
      if (forcedId && Number(registration.school_unit_id) !== Number(forcedId)) {
        return res.status(403).json({ success: false, message: 'Tidak boleh mengubah data unit lain' });
      }
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      if (Number(registration.school_unit_id) !== Number(req.user.school_unit_id)) {
        return res.status(403).json({ success: false, message: 'Tidak boleh mengubah data unit lain' });
      }
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
    const forcedUnitCode = resolveUnitCodeFromRequestHost(req);
    let where = '';
    let params = [];
    if (forcedUnitCode) {
      const forcedId = await getSchoolUnitIdByCode(forcedUnitCode);
      where = 'WHERE school_unit_id = ?';
      params = [forcedId];
    } else if (req.user?.role_raw === 'admin_unit') {
      if (!req.user.school_unit_id) return res.status(403).json({ success: false, message: 'Akun admin unit belum di-set unitnya' });
      where = 'WHERE school_unit_id = ?';
      params = [Number(req.user.school_unit_id)];
    } else {
      const jenjang = String(req.query?.jenjang || '').trim();
      if (jenjang && jenjang.toLowerCase() !== 'semua') {
        const id = await getSchoolUnitIdByCode(jenjang);
        if (id) {
          where = 'WHERE school_unit_id = ?';
          params = [id];
        }
      }
    }

    const totalResult = await getOne(`SELECT COUNT(*) as total FROM ppdb_registrations ${where}`, params);

    const byJenjang = await executeQuery(
      `SELECT su.code AS jenjang, COUNT(*) as count
       FROM ppdb_registrations r
       LEFT JOIN school_units su ON r.school_unit_id = su.id
       ${where ? where.replace('school_unit_id', 'r.school_unit_id') : ''}
       GROUP BY su.code
       ORDER BY su.code`,
      params
    );

    const byStatus = await executeQuery(
      `SELECT status, COUNT(*) as count FROM ppdb_registrations ${where} GROUP BY status`,
      params
    );

    const recentResult = await getOne(
      `SELECT COUNT(*) as count FROM ppdb_registrations ${where ? `${where} AND` : 'WHERE'} created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`,
      params
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
