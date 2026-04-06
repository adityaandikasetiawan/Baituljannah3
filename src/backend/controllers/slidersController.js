const path = require('path');
const multer = require('multer');
const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');

const uploadsBaseDir = path.resolve(__dirname, '../../../public/uploads');
const sliderUploadDir = path.join(uploadsBaseDir, 'hero');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, sliderUploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.bin';
    const safeExt = ext.length <= 10 ? ext : '.bin';
    const name = `slider_${Date.now()}_${Math.random().toString(36).slice(2, 10)}${safeExt}`;
    cb(null, name);
  }
});

const fileFilter = (_req, file, cb) => {
  const allowed = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
  if (file.mimetype && allowed.has(file.mimetype)) return cb(null, true);
  cb(new Error('File harus berupa gambar'));
};

exports.uploadSliderImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
}).single('image');

exports.getActiveSliders = async (_req, res) => {
  try {
    const rows = await executeQuery(
      "SELECT id, title, image, subtitle, button_text, button_url, `order`, status FROM sliders WHERE status = 'active' ORDER BY `order` ASC, id ASC"
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data slider' });
  }
};

exports.getAllSliders = async (_req, res) => {
  try {
    const rows = await executeQuery(
      'SELECT id, title, image, subtitle, button_text, button_url, `order`, status, created_at, updated_at FROM sliders ORDER BY `order` ASC, id ASC'
    );
    res.status(200).json({ success: true, data: rows });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengambil data slider' });
  }
};

exports.createSlider = async (req, res) => {
  try {
    const { title, subtitle, button_text, button_url, order, status, image } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(400).json({ success: false, message: 'Title wajib diisi' });
    }

    const imageValue = image && String(image).trim() ? String(image).trim() : null;
    if (!imageValue) {
      return res.status(400).json({ success: false, message: 'Image wajib diisi' });
    }

    const orderValue = Number.isFinite(Number(order)) ? Number(order) : 0;
    const statusValue = status === 'inactive' ? 'inactive' : 'active';

    const id = await insert(
      'INSERT INTO sliders (title, image, subtitle, button_text, button_url, `order`, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [
        String(title).trim(),
        imageValue,
        subtitle && String(subtitle).trim() ? String(subtitle).trim() : null,
        button_text && String(button_text).trim() ? String(button_text).trim() : null,
        button_url && String(button_url).trim() ? String(button_url).trim() : null,
        orderValue,
        statusValue
      ]
    );

    const created = await getOne('SELECT * FROM sliders WHERE id = ?', [id]);
    res.status(201).json({ success: true, data: created });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal membuat slider' });
  }
};

exports.updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await getOne('SELECT * FROM sliders WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Slider tidak ditemukan' });

    const next = {
      title: req.body.title !== undefined ? String(req.body.title).trim() : existing.title,
      image: req.body.image !== undefined ? String(req.body.image).trim() : existing.image,
      subtitle: req.body.subtitle !== undefined ? (req.body.subtitle ? String(req.body.subtitle).trim() : null) : existing.subtitle,
      button_text: req.body.button_text !== undefined ? (req.body.button_text ? String(req.body.button_text).trim() : null) : existing.button_text,
      button_url: req.body.button_url !== undefined ? (req.body.button_url ? String(req.body.button_url).trim() : null) : existing.button_url,
      order: req.body.order !== undefined && Number.isFinite(Number(req.body.order)) ? Number(req.body.order) : existing.order,
      status: req.body.status === 'inactive' ? 'inactive' : req.body.status === 'active' ? 'active' : existing.status
    };

    if (!next.title) return res.status(400).json({ success: false, message: 'Title wajib diisi' });
    if (!next.image) return res.status(400).json({ success: false, message: 'Image wajib diisi' });

    await update(
      'UPDATE sliders SET title = ?, image = ?, subtitle = ?, button_text = ?, button_url = ?, `order` = ?, status = ?, updated_at = NOW() WHERE id = ?',
      [next.title, next.image, next.subtitle, next.button_text, next.button_url, next.order, next.status, id]
    );

    const updated = await getOne('SELECT * FROM sliders WHERE id = ?', [id]);
    res.status(200).json({ success: true, data: updated });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal mengupdate slider' });
  }
};

exports.deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const affected = await deleteRow('DELETE FROM sliders WHERE id = ?', [id]);
    if (!affected) return res.status(404).json({ success: false, message: 'Slider tidak ditemukan' });
    res.status(200).json({ success: true, message: 'Slider berhasil dihapus' });
  } catch {
    res.status(500).json({ success: false, message: 'Gagal menghapus slider' });
  }
};

exports.handleUploadResponse = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'File tidak ditemukan' });
  }

  res.status(201).json({
    success: true,
    data: {
      url: `/uploads/hero/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    }
  });
};
