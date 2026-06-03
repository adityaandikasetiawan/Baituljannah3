const { executeQuery, getOne } = require('../config/database');

// GET /api/v1/site-settings — public, returns all or specific keys
exports.getSettings = async (req, res) => {
  try {
    const { keys } = req.query;
    let rows;
    if (keys) {
      const keyList = String(keys).split(',').map(k => k.trim()).filter(Boolean);
      if (!keyList.length) return res.json({ success: true, data: {} });
      const placeholders = keyList.map(() => '?').join(',');
      rows = await executeQuery(
        `SELECT setting_key, setting_value, setting_type FROM site_settings WHERE setting_key IN (${placeholders})`,
        keyList
      );
    } else {
      rows = await executeQuery('SELECT setting_key, setting_value, setting_type FROM site_settings ORDER BY setting_key');
    }

    const data = {};
    for (const row of rows) {
      if (row.setting_type === 'json') {
        try { data[row.setting_key] = JSON.parse(row.setting_value); } catch { data[row.setting_key] = row.setting_value; }
      } else {
        data[row.setting_key] = row.setting_value;
      }
    }
    res.json({ success: true, data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/v1/site-settings/manage — admin
exports.getSettingsManage = async (req, res) => {
  try {
    const rows = await executeQuery('SELECT * FROM site_settings ORDER BY setting_key');
    res.json({ success: true, data: rows });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/v1/site-settings/:key — admin upsert single
exports.updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value, type } = req.body;
    const val = typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
    const existing = await getOne('SELECT id FROM site_settings WHERE setting_key=?', [key]);
    if (existing) {
      await executeQuery('UPDATE site_settings SET setting_value=?, setting_type=?, updated_at=NOW() WHERE setting_key=?',
        [val, type || 'text', key]);
    } else {
      await executeQuery('INSERT INTO site_settings (setting_key, setting_value, setting_type, created_at, updated_at) VALUES (?,?,?,NOW(),NOW())',
        [key, val, type || 'text']);
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/v1/site-settings — admin bulk update
exports.bulkUpdateSettings = async (req, res) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      const val = typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
      const existing = await getOne('SELECT id FROM site_settings WHERE setting_key=?', [key]);
      if (existing) {
        await executeQuery('UPDATE site_settings SET setting_value=?, updated_at=NOW() WHERE setting_key=?', [val, key]);
      } else {
        await executeQuery('INSERT INTO site_settings (setting_key, setting_value, created_at, updated_at) VALUES (?,?,NOW(),NOW())', [key, val]);
      }
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
