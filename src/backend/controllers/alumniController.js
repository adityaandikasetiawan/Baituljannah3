const { executeQuery, getOne, insert, update } = require('../config/database');

exports.getAlumniPublic = async (req, res) => {
  try {
    const { year, limit = 100 } = req.query;
    let where = "WHERE status = 'active'";
    const params = [];
    if (year && year !== 'Semua') { where += ' AND graduation_year = ?'; params.push(year); }
    const rows = await executeQuery(
      `SELECT id, name, graduation_year, unit, university, faculty, major,
              current_position, company, achievement, image_url, story, tags, linkedin, email
       FROM alumni ${where} ORDER BY graduation_year DESC, sort_order ASC LIMIT ?`,
      [...params, Number(limit)]
    );
    res.json({ success: true, data: rows.map(r => ({ ...r, tags: tryParse(r.tags, []) })) });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

exports.getAlumniManage = async (req, res) => {
  try {
    const rows = await executeQuery('SELECT * FROM alumni ORDER BY graduation_year DESC, sort_order ASC');
    res.json({ success: true, data: rows.map(r => ({ ...r, tags: tryParse(r.tags, []) })) });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

exports.createAlumni = async (req, res) => {
  try {
    const { name, graduation_year, unit, university, faculty, major, current_position,
            company, achievement, image_url, story, tags, linkedin, email, sort_order } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'name wajib diisi' });
    const id = await insert(
      `INSERT INTO alumni (name, graduation_year, unit, university, faculty, major, current_position,
       company, achievement, image_url, story, tags, linkedin, email, sort_order, status, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,'active',NOW(),NOW())`,
      [name, graduation_year||'', unit||'SMAIT', university||'', faculty||'', major||'',
       current_position||'', company||'', achievement||'', image_url||'', story||'',
       JSON.stringify(tags||[]), linkedin||'', email||'', sort_order||0]
    );
    res.status(201).json({ success: true, data: { id } });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

exports.updateAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    if (!await getOne('SELECT id FROM alumni WHERE id=?', [id])) return res.status(404).json({ success: false, message: 'Tidak ditemukan' });
    const { name, graduation_year, unit, university, faculty, major, current_position,
            company, achievement, image_url, story, tags, linkedin, email, sort_order, status } = req.body;
    await update(
      `UPDATE alumni SET name=?,graduation_year=?,unit=?,university=?,faculty=?,major=?,
       current_position=?,company=?,achievement=?,image_url=?,story=?,tags=?,linkedin=?,
       email=?,sort_order=?,status=?,updated_at=NOW() WHERE id=?`,
      [name, graduation_year||'', unit||'SMAIT', university||'', faculty||'', major||'',
       current_position||'', company||'', achievement||'', image_url||'', story||'',
       JSON.stringify(tags||[]), linkedin||'', email||'', sort_order||0, status||'active', id]
    );
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

exports.deleteAlumni = async (req, res) => {
  try {
    await executeQuery('DELETE FROM alumni WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

function tryParse(val, fb) { try { return val ? JSON.parse(val) : fb; } catch { return fb; } }
