const nodemailer = require('nodemailer');
const config = require('../config/config');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${config.email.fromName} <${config.email.from}>`,
      to: options.email,
      subject: options.subject,
      html: options.html || options.message
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent:', info.messageId);
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('❌ Email Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Email templates
const emailTemplates = {
  // PPDB Registration Confirmation
  ppdbConfirmation: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1E4AB8, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .info-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #1E4AB8; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .button { display: inline-block; padding: 12px 30px; background: #1E4AB8; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Pendaftaran Berhasil!</h1>
          <p>Yayasan Baituljannah Islamic School</p>
        </div>
        <div class="content">
          <p>Assalamu'alaikum ${data.nama_lengkap},</p>
          <p>Terima kasih telah mendaftar di <strong>Yayasan Baituljannah</strong>. Berikut adalah detail pendaftaran Anda:</p>
          
          <div class="info-box">
            <h3 style="margin-top: 0; color: #1E4AB8;">📋 Informasi Pendaftaran</h3>
            <p><strong>Nomor Pendaftaran:</strong> ${data.no_pendaftaran}</p>
            <p><strong>Nama Lengkap:</strong> ${data.nama_lengkap}</p>
            <p><strong>Jenjang:</strong> ${data.jenjang}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>No. Telp:</strong> ${data.no_telp}</p>
          </div>
          
          <p><strong>Status:</strong> Menunggu Verifikasi</p>
          <p>Tim kami akan melakukan verifikasi data Anda dalam 1-2 hari kerja. Anda akan menerima email notifikasi setelah proses verifikasi selesai.</p>
          
          <center>
            <a href="https://baituljannah.sch.id/ppdb/check/${data.no_pendaftaran}" class="button">Cek Status Pendaftaran</a>
          </center>
          
          <p style="margin-top: 30px;"><strong>Langkah Selanjutnya:</strong></p>
          <ol>
            <li>Tunggu email konfirmasi verifikasi</li>
            <li>Siapkan dokumen yang diperlukan</li>
            <li>Lakukan pembayaran sesuai instruksi</li>
            <li>Selesaikan proses administrasi</li>
          </ol>
          
          <p>Jika ada pertanyaan, silakan hubungi kami di:</p>
          <p>📞 WhatsApp: 0812-3456-7890<br>
          📧 Email: ppdb@baituljannah.sch.id</p>
        </div>
        <div class="footer">
          <p>Yayasan Baituljannah Islamic School<br>
          Jl. Pendidikan No. 123, Jakarta<br>
          www.baituljannah.sch.id</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Contact Form Auto Reply
  contactAutoReply: (data) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1E4AB8, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✉️ Pesan Terkirim</h1>
          <p>Yayasan Baituljannah Islamic School</p>
        </div>
        <div class="content">
          <p>Halo ${data.name},</p>
          <p>Terima kasih telah menghubungi kami. Pesan Anda telah kami terima dan akan segera ditindaklanjuti oleh tim kami.</p>
          
          <p><strong>Detail Pesan Anda:</strong></p>
          <p><strong>Subjek:</strong> ${data.subject}<br>
          <strong>Pesan:</strong> ${data.message}</p>
          
          <p>Kami akan merespons dalam 1x24 jam di hari kerja.</p>
          
          <p>Salam hangat,<br>
          <strong>Tim Yayasan Baituljannah</strong></p>
        </div>
        <div class="footer">
          <p>Yayasan Baituljannah Islamic School<br>
          www.baituljannah.sch.id</p>
        </div>
      </div>
    </body>
    </html>
  `
};

module.exports = {
  sendEmail,
  emailTemplates
};
