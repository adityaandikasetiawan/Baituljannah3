import React, { useState, useEffect } from 'react';
import { CheckCircle, Mail, X } from 'lucide-react';

interface EmailServiceProps {
  recipientEmail: string;
  recipientName: string;
  position: string;
  onClose: () => void;
}

export const EmailService: React.FC<EmailServiceProps> = ({
  recipientEmail,
  recipientName,
  position,
  onClose
}) => {
  const [sending, setSending] = useState(true);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // Simulate sending email
    const timer = setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const emailTemplate = `
Assalamu'alaikum Wr. Wb.

Yth. ${recipientName}

Terima kasih telah melamar untuk posisi ${position} di Yayasan Baitul Jannah Islamic School.

Kami telah menerima lamaran Anda dan saat ini sedang dalam proses review. Tim HR kami akan menghubungi Anda dalam 3-5 hari kerja ke depan untuk tahap selanjutnya.

Berikut adalah langkah-langkah proses seleksi kami:
1. Seleksi Administrasi (saat ini)
2. Tes Kemampuan
3. Wawancara
4. Offering

Jika Anda memiliki pertanyaan, silakan hubungi kami di:
📧 recruitment@baituljannah.sch.id
📱 0812-3456-7890

Terima kasih atas minat Anda untuk bergabung dengan keluarga besar Baitul Jannah.

Wassalamu'alaikum Wr. Wb.

---
Tim HR Yayasan Baitul Jannah
Mencetak Generasi Qurani yang Cerdas dan Berakhlak Mulia
🌐 www.baituljannah.sch.id
  `;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-[#1E4AB8] to-[#2563eb] text-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl">Email Konfirmasi</h3>
                <p className="text-white/80 text-sm">Auto-reply kepada pelamar</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {sending ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#1E4AB8] mb-4"></div>
              <p className="text-gray-600">Mengirim email ke {recipientEmail}...</p>
            </div>
          ) : sent ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl mb-2 text-green-900">Email Berhasil Dikirim!</h4>
                <p className="text-green-700">
                  Email konfirmasi telah dikirim ke <strong>{recipientEmail}</strong>
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#1E4AB8]" />
                  Preview Email
                </h4>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                    {emailTemplate}
                  </pre>
                </div>
              </div>

              <button
                onClick={onClose}
                className="btn-primary w-full"
              >
                Tutup
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
