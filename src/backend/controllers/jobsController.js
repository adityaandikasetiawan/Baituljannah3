const { executeQuery, getOne, insert, update } = require('../config/database');

exports.getJobsPublic = async (req, res) => {
  try {
    const { department, type } = req.query;
    let where = "WHERE status = 'open'";
    const params = [];
    if (department && department !== 'Semua') { where += ' AND department = ?'; params.push(department); }
    if (type && type !== 'Semua') { where += ' AND type = ?'; params.push(type); }
    const rows = await executeQuery(
      `SELECT id, title, department, location, type, salary, description, requirements, posted_date, featured
       FROM jobs ${where} ORDER BY featured DESC, created_at DESC`,
      params
    );
    res.json({ success: true, data: rows.map(r => ({ ...r, requirements: tryParse(r.requirements, []) })) });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

exports.getJobsManage = async (req, res) => {
  try {
    const rows = await executeQuery('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json({ success: true, data: rows.map(r => ({ ...r, requirements: tryParse(r.requirements, []) })) });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

exports.createJob = async (req, res) => {
  try {
    const { title, department, location, type, salary, description, requirements, posted_date, featured } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'title wajib diisi' });
    const id = await insert(
      `INSERT INTO jobs (title, department, location, type, salary, description, requirements, posted_date, featured, status, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,'open',NOW(),NOW())`,
      [title, department||'', location||'', type||'Full-time', salary||'Kompetitif',
       description||'', JSON.stringify(requirements||[]), posted_date||'', featured?1:0]
    );
    res.status(201).json({ success: true, data: { id } });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    if (!await getOne('SELECT id FROM jobs WHERE id=?', [id])) return res.status(404).json({ success: false, message: 'Tidak ditemukan' });
    const { title, department, location, type, salary, description, requirements, posted_date, featured, status } = req.body;
    await update(
      `UPDATE jobs SET title=?,department=?,location=?,type=?,salary=?,description=?,requirements=?,
       posted_date=?,featured=?,status=?,updated_at=NOW() WHERE id=?`,
      [title, department||'', location||'', type||'Full-time', salary||'Kompetitif',
       description||'', JSON.stringify(requirements||[]), posted_date||'', featured?1:0, status||'open', id]
    );
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

exports.deleteJob = async (req, res) => {
  try {
    await executeQuery('DELETE FROM jobs WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: 'Server error' }); }
};

function tryParse(val, fb) { try { return val ? JSON.parse(val) : fb; } catch { return fb; } }
