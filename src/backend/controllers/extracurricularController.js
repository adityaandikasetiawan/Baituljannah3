const { executeQuery, getOne, insert, deleteRow } = require('../config/database');

const seedActivities = [
  { id: 'basket', name: 'Basket', day: 'Rabu', time: '15:30', location: 'Lapangan', quota: 30 },
  { id: 'paskibra', name: 'Paskibra', day: 'Selasa', time: '15:30', location: 'Lapangan', quota: 40 },
  { id: 'tahfidz', name: 'Tahfidz', day: 'Kamis', time: '16:00', location: 'Masjid', quota: 50 },
  { id: 'englishclub', name: 'English Club', day: 'Senin', time: '15:30', location: 'R. Bahasa', quota: 25 },
];

const ensureTables = async () => {
  await executeQuery(`
    CREATE TABLE IF NOT EXISTS exkul_activities (
      id VARCHAR(32) PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      day VARCHAR(16) NOT NULL,
      time VARCHAR(16) NOT NULL,
      location VARCHAR(64) NOT NULL,
      quota INT NOT NULL DEFAULT 0
    )
  `);

  await executeQuery(`
    CREATE TABLE IF NOT EXISTS exkul_registrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_nis VARCHAR(32) NOT NULL,
      activity_id VARCHAR(32) NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uniq_student_activity (student_nis, activity_id)
    )
  `);

  const count = await getOne('SELECT COUNT(*) as total FROM exkul_activities');
  if (!count || Number(count.total) === 0) {
    for (const a of seedActivities) {
      await executeQuery(
        'INSERT INTO exkul_activities (id, name, day, time, location, quota) VALUES (?, ?, ?, ?, ?, ?)',
        [a.id, a.name, a.day, a.time, a.location, a.quota]
      );
    }
  }
};

exports.getActivities = async (req, res) => {
  try {
    await ensureTables();
    const rows = await executeQuery('SELECT * FROM exkul_activities ORDER BY day, time, name');
    return res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data ekskul',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    await ensureTables();
    const { student_nis } = req.query;
    if (!student_nis) return res.status(400).json({ success: false, message: 'student_nis wajib diisi' });

    const rows = await executeQuery(
      'SELECT id, student_nis, activity_id, created_at FROM exkul_registrations WHERE student_nis = ? ORDER BY created_at DESC, id DESC',
      [student_nis]
    );
    return res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil pendaftaran ekskul',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.register = async (req, res) => {
  try {
    await ensureTables();
    const { student_nis, activity_id } = req.body || {};
    if (!student_nis || !activity_id) return res.status(400).json({ success: false, message: 'student_nis dan activity_id wajib diisi' });

    const id = await insert(
      'INSERT INTO exkul_registrations (student_nis, activity_id, created_at) VALUES (?, ?, NOW())',
      [student_nis, activity_id]
    );
    const row = await getOne('SELECT * FROM exkul_registrations WHERE id = ?', [id]);
    return res.status(201).json({ success: true, message: 'Pendaftaran ekskul tersimpan', data: row });
  } catch (error) {
    if (error && String(error.code) === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Sudah terdaftar di ekskul ini' });
    }
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mendaftar ekskul',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.unregister = async (req, res) => {
  try {
    await ensureTables();
    const { student_nis, activity_id } = req.body || {};
    if (!student_nis || !activity_id) return res.status(400).json({ success: false, message: 'student_nis dan activity_id wajib diisi' });

    const affected = await deleteRow('DELETE FROM exkul_registrations WHERE student_nis = ? AND activity_id = ?', [
      student_nis,
      activity_id,
    ]);
    if (!affected) return res.status(404).json({ success: false, message: 'Pendaftaran tidak ditemukan' });
    return res.status(200).json({ success: true, message: 'Pendaftaran dibatalkan' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membatalkan pendaftaran',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

