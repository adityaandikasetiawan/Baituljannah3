const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');

const ensureTables = async () => {
  await executeQuery(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_nis VARCHAR(32) NOT NULL,
      direction ENUM('in', 'out') NOT NULL,
      peer VARCHAR(128) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

exports.getAll = async (req, res) => {
  try {
    await ensureTables();
    const { student_nis } = req.query;
    if (!student_nis) {
      return res.status(400).json({ success: false, message: 'student_nis wajib diisi' });
    }

    const rows = await executeQuery(
      'SELECT * FROM messages WHERE student_nis = ? ORDER BY created_at DESC, id DESC LIMIT 200',
      [student_nis]
    );

    return res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.create = async (req, res) => {
  try {
    await ensureTables();
    const { student_nis, direction, peer, subject, content, created_at } = req.body || {};
    if (!student_nis || !direction || !peer || !subject || !content) {
      return res.status(400).json({ success: false, message: 'student_nis, direction, peer, subject, content wajib diisi' });
    }
    if (!['in', 'out'].includes(direction)) {
      return res.status(400).json({ success: false, message: 'direction harus in atau out' });
    }

    const id = await insert(
      `INSERT INTO messages (student_nis, direction, peer, subject, content, is_read, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [student_nis, direction, peer, subject, content, direction === 'in' ? 0 : 1, created_at ? new Date(created_at) : new Date()]
    );

    const row = await getOne('SELECT * FROM messages WHERE id = ?', [id]);
    return res.status(201).json({ success: true, message: 'Pesan tersimpan', data: row });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menyimpan pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.markRead = async (req, res) => {
  try {
    await ensureTables();
    const { id } = req.params;
    const affected = await update('UPDATE messages SET is_read = 1 WHERE id = ?', [id]);
    if (!affected) return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan' });
    const row = await getOne('SELECT * FROM messages WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Pesan ditandai dibaca', data: row });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat update pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    await ensureTables();
    const { id } = req.params;
    const affected = await deleteRow('DELETE FROM messages WHERE id = ?', [id]);
    if (!affected) return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan' });
    return res.status(200).json({ success: true, message: 'Pesan dihapus' });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

