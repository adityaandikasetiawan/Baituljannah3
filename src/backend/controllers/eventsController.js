const { executeQuery, getOne, insert, update } = require('../config/database');

// GET /api/v1/events — public
exports.getEventsPublic = async (req, res) => {
  try {
    const { category, limit = 100 } = req.query;
    let where = '';
    const params = [];
    if (category && category !== 'Semua') {
      where = 'WHERE category = ?';
      params.push(category);
    }
    const rows = await executeQuery(
      `SELECT id, title, event_date, event_time, location, category, unit,
              description, image_url, capacity, status, accent_color, agenda
       FROM events
       ${where}
       ORDER BY event_date ASC
       LIMIT ?`,
      [...params, Number(limit)]
    );

    const data = rows.map(row => ({
      id: row.id,
      title: row.title,
      date: row.event_date ? String(row.event_date).split('T')[0] : '',
      time: row.event_time || '',
      location: row.location || '',
      category: row.category || '',
      unit: row.unit || 'Semua',
      description: row.description || '',
      image: row.image_url || 'https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c',
      capacity: row.capacity || '',
      status: row.status || 'Mendatang',
      accentColor: row.accent_color || '#1E4AB8',
      agenda: tryParse(row.agenda, []),
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/v1/events/manage — admin
exports.getEventsManage = async (req, res) => {
  try {
    const rows = await executeQuery('SELECT * FROM events ORDER BY event_date ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// POST /api/v1/events — admin
exports.createEvent = async (req, res) => {
  try {
    const { title, event_date, event_time, location, category, unit,
            description, image_url, capacity, status, accent_color, agenda } = req.body;
    if (!title || !event_date) return res.status(400).json({ success: false, message: 'title dan event_date wajib' });

    const id = await insert(
      `INSERT INTO events (title, event_date, event_time, location, category, unit,
       description, image_url, capacity, status, accent_color, agenda, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [title, event_date, event_time || '', location || '', category || 'Lainnya',
       unit || 'Semua', description || '', image_url || '', capacity || '',
       status || 'Mendatang', accent_color || '#1E4AB8', JSON.stringify(agenda || [])]
    );
    res.status(201).json({ success: true, data: { id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/v1/events/:id — admin
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getOne('SELECT id FROM events WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Tidak ditemukan' });

    const { title, event_date, event_time, location, category, unit,
            description, image_url, capacity, status, accent_color, agenda } = req.body;

    await update(
      `UPDATE events SET title=?, event_date=?, event_time=?, location=?, category=?, unit=?,
       description=?, image_url=?, capacity=?, status=?, accent_color=?, agenda=?, updated_at=NOW()
       WHERE id=?`,
      [title, event_date, event_time || '', location || '', category || 'Lainnya',
       unit || 'Semua', description || '', image_url || '', capacity || '',
       status || 'Mendatang', accent_color || '#1E4AB8', JSON.stringify(agenda || []), id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/v1/events/:id — admin
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await executeQuery('DELETE FROM events WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

function tryParse(val, fallback) {
  try { return val ? JSON.parse(val) : fallback; } catch { return fallback; }
}
