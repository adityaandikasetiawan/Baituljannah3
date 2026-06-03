const { executeQuery, getOne, insert, update } = require('../config/database');

// GET /api/v1/teachers — public
exports.getTeachersPublic = async (req, res) => {
  try {
    const { unit, limit = 100 } = req.query;
    let where = 'WHERE t.status = "active"';
    const params = [];
    if (unit && unit !== 'Semua') {
      where += ' AND t.unit = ?';
      params.push(unit);
    }
    const rows = await executeQuery(
      `SELECT t.id, t.name, t.title, t.unit, t.subject, t.education, t.experience,
              t.specialization, t.achievements, t.email, t.phone, t.image_url,
              t.bio, t.philosophy, t.accent_color
       FROM teachers t
       ${where}
       ORDER BY t.sort_order ASC, t.created_at DESC
       LIMIT ?`,
      [...params, Number(limit)]
    );

    const data = rows.map(row => ({
      id: row.id,
      name: row.name,
      title: row.title,
      unit: row.unit,
      subject: row.subject,
      education: row.education,
      experience: row.experience,
      specialization: tryParse(row.specialization, []),
      achievements: tryParse(row.achievements, []),
      email: row.email,
      phone: row.phone,
      image: row.image_url || '',
      bio: row.bio || '',
      philosophy: row.philosophy || '',
      accentColor: row.accent_color || '#1E4AB8',
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/v1/teachers/manage — admin
exports.getTeachersManage = async (req, res) => {
  try {
    const rows = await executeQuery(
      `SELECT * FROM teachers ORDER BY sort_order ASC, created_at DESC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/v1/teachers — admin
exports.createTeacher = async (req, res) => {
  try {
    const { name, title, unit, subject, education, experience, specialization,
            achievements, email, phone, image_url, bio, philosophy, accent_color, sort_order } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'name wajib diisi' });

    const id = await insert(
      `INSERT INTO teachers (name, title, unit, subject, education, experience, specialization,
       achievements, email, phone, image_url, bio, philosophy, accent_color, sort_order, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW(), NOW())`,
      [name, title || '', unit || 'Semua', subject || '', education || '', experience || '',
       JSON.stringify(specialization || []), JSON.stringify(achievements || []),
       email || '', phone || '', image_url || '', bio || '', philosophy || '',
       accent_color || '#1E4AB8', sort_order || 0]
    );
    res.status(201).json({ success: true, data: { id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/v1/teachers/:id — admin
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getOne('SELECT id FROM teachers WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Tidak ditemukan' });

    const { name, title, unit, subject, education, experience, specialization,
            achievements, email, phone, image_url, bio, philosophy, accent_color, sort_order, status } = req.body;

    await update(
      `UPDATE teachers SET name=?, title=?, unit=?, subject=?, education=?, experience=?,
       specialization=?, achievements=?, email=?, phone=?, image_url=?, bio=?, philosophy=?,
       accent_color=?, sort_order=?, status=?, updated_at=NOW() WHERE id=?`,
      [name, title || '', unit || 'Semua', subject || '', education || '', experience || '',
       JSON.stringify(specialization || []), JSON.stringify(achievements || []),
       email || '', phone || '', image_url || '', bio || '', philosophy || '',
       accent_color || '#1E4AB8', sort_order || 0, status || 'active', id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/v1/teachers/:id — admin
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    await executeQuery('DELETE FROM teachers WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

function tryParse(val, fallback) {
  try { return val ? JSON.parse(val) : fallback; } catch { return fallback; }
}
