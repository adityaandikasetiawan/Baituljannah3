const { executeQuery, getOne, insert, deleteRow } = require('../config/database');

const seedCounselors = [
  { id: 'bk-1', name: 'Ustadzah Siti', specialty: 'Akademik' },
  { id: 'bk-2', name: 'Ustadz Ahmad', specialty: 'Karir' },
  { id: 'bk-3', name: 'Ustadzah Fatimah', specialty: 'Kedisiplinan' },
];

const ensureTables = async () => {
  await executeQuery(`
    CREATE TABLE IF NOT EXISTS bk_counselors (
      id VARCHAR(32) PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      specialty VARCHAR(64) NOT NULL
    )
  `);

  await executeQuery(`
    CREATE TABLE IF NOT EXISTS bk_bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_nis VARCHAR(32) NOT NULL,
      counselor_id VARCHAR(32) NOT NULL,
      date VARCHAR(10) NOT NULL,
      time VARCHAR(16) NOT NULL,
      topic TEXT NULL,
      status ENUM('booked', 'cancelled') NOT NULL DEFAULT 'booked',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_counselor_slot (counselor_id, date, time)
    )
  `);

  const count = await getOne('SELECT COUNT(*) as total FROM bk_counselors');
  if (!count || Number(count.total) === 0) {
    for (const c of seedCounselors) {
      await executeQuery('INSERT INTO bk_counselors (id, name, specialty) VALUES (?, ?, ?)', [c.id, c.name, c.specialty]);
    }
  }
};

exports.getCounselors = async (req, res) => {
  try {
    await ensureTables();
    const rows = await executeQuery('SELECT * FROM bk_counselors ORDER BY name');
    return res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data konselor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    await ensureTables();
    const { student_nis } = req.query;
    if (!student_nis) return res.status(400).json({ success: false, message: 'student_nis wajib diisi' });

    if (req.user?.role === 'siswa' && String(req.user.username) !== String(student_nis)) {
      return res.status(403).json({ success: false, message: 'Tidak memiliki akses' });
    }

    const rows = await executeQuery(
      'SELECT * FROM bk_bookings WHERE student_nis = ? ORDER BY created_at DESC, id DESC LIMIT 200',
      [student_nis]
    );
    return res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    await ensureTables();
    const { student_nis, counselor_id, date, time, topic } = req.body || {};
    if (!student_nis || !counselor_id || !date || !time) {
      return res.status(400).json({ success: false, message: 'student_nis, counselor_id, date, time wajib diisi' });
    }

    if (req.user?.role === 'siswa' && String(req.user.username) !== String(student_nis)) {
      return res.status(403).json({ success: false, message: 'Tidak memiliki akses' });
    }

    const id = await insert(
      'INSERT INTO bk_bookings (student_nis, counselor_id, date, time, topic, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [student_nis, counselor_id, date, time, topic || null, 'booked']
    );
    const row = await getOne('SELECT * FROM bk_bookings WHERE id = ?', [id]);
    return res.status(201).json({ success: true, message: 'Booking tersimpan', data: row });
  } catch (error) {
    if (error && String(error.code) === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Slot sudah terisi' });
    }
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await ensureTables();
    const { id } = req.params;

    if (req.user?.role === 'siswa') {
      const existing = await getOne('SELECT student_nis FROM bk_bookings WHERE id = ?', [id]);
      if (!existing || String(existing.student_nis) !== String(req.user.username)) {
        return res.status(404).json({ success: false, message: 'Booking tidak ditemukan' });
      }
    }

    const affected = await deleteRow('DELETE FROM bk_bookings WHERE id = ?', [id]);
    if (!affected) return res.status(404).json({ success: false, message: 'Booking tidak ditemukan' });
    return res.status(200).json({ success: true, message: 'Booking dihapus' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus booking',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
