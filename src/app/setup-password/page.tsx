'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/layout/Navbar';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';
import { CheckCircle, Eye, EyeOff, Lock, XCircle } from 'lucide-react';

type InvitePayload = {
  email: string;
  fullName: string;
  role: string;
  unit: string;
  exp: number;
  nonce: string;
};

const decodeBase64Url = (input: string) => {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const decoded = atob(padded);
  return decodeURIComponent(
    decoded
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
};

const sha256Hex = async (text: string) => {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export default function SetupPasswordPage() {
  const router = useRouter();
  const { menuItems } = useNavigationMenu();
  const [token, setToken] = React.useState('');

  const [invite, setInvite] = React.useState<InvitePayload | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const t = new URLSearchParams(window.location.search).get('token') ?? '';
    setToken(t);
  }, []);

  React.useEffect(() => {
    if (!token) {
      setError('Token tidak ditemukan.');
      return;
    }

    try {
      const raw = decodeBase64Url(token);
      const payload = JSON.parse(raw) as InvitePayload;
      if (!payload?.email || !payload?.exp) {
        setError('Token tidak valid.');
        return;
      }
      if (Date.now() > payload.exp) {
        setError('Token sudah kedaluwarsa. Minta admin untuk mengirim undangan baru.');
        return;
      }
      setInvite(payload);
    } catch {
      setError('Token tidak valid.');
    }
  }, [token]);

  const passwordError = React.useMemo(() => {
    if (!password) return null;
    if (password.length < 12) return 'Minimal 12 karakter.';
    if (!/[A-Z]/.test(password)) return 'Harus ada huruf besar.';
    if (!/[a-z]/.test(password)) return 'Harus ada huruf kecil.';
    if (!/[0-9]/.test(password)) return 'Harus ada angka.';
    if (!/[^A-Za-z0-9]/.test(password)) return 'Harus ada simbol.';
    return null;
  }, [password]);

  const confirmError = React.useMemo(() => {
    if (!confirmPassword) return null;
    if (confirmPassword !== password) return 'Konfirmasi password tidak sama.';
    return null;
  }, [confirmPassword, password]);

  const canSubmit = !!invite && !passwordError && !confirmError && password.length > 0 && confirmPassword.length > 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invite) return;
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const passwordHash = await sha256Hex(password);
      const raw = localStorage.getItem('baituljannah_password_hashes_v1');
      const store = raw ? (JSON.parse(raw) as Record<string, string>) : {};
      store[invite.email] = passwordHash;
      localStorage.setItem('baituljannah_password_hashes_v1', JSON.stringify(store));

      const rawEmails = localStorage.getItem('baituljannah_password_set_emails_v1');
      const emails = rawEmails ? (JSON.parse(rawEmails) as string[]) : [];
      const next = Array.isArray(emails) ? Array.from(new Set([...emails, invite.email])) : [invite.email];
      localStorage.setItem('baituljannah_password_set_emails_v1', JSON.stringify(next));

      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar siteName="Setup Password - Baituljannah" accentColor="#1E4AB8" menuItems={menuItems} />

      <div className="container mx-auto py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Atur Password</h1>
            <p className="text-gray-600 mb-8">
              Buat password untuk mengaktifkan akun Anda di Sistem Yayasan Baituljannah.
            </p>

            {error ? (
              <div className="p-5 rounded-2xl bg-red-50 border border-red-100">
                <div className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-red-900 font-medium mb-1">Gagal</p>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            ) : success && invite ? (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-7 h-7 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-green-900 font-medium mb-1">Password berhasil disimpan</p>
                      <p className="text-green-700 text-sm">
                        Akun <span className="font-medium">{invite.email}</span> sudah siap digunakan.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full px-6 py-3 rounded-xl bg-[#1E4AB8] text-white hover:bg-[#1E4AB8]/90 transition-colors"
                >
                  Ke Halaman Login
                </button>
              </div>
            ) : invite ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                  <p className="text-sm text-blue-900 mb-1">Akun</p>
                  <p className="text-base text-blue-900 font-medium">{invite.email}</p>
                  <p className="text-xs text-blue-700 mt-2">
                    Undangan berlaku sampai {new Date(invite.exp).toLocaleString('id-ID')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                      placeholder="Minimal 12 karakter"
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                    </button>
                  </div>
                  {passwordError ? <p className="text-xs text-red-600 mt-2">{passwordError}</p> : null}
                  {!passwordError && password ? <p className="text-xs text-green-700 mt-2">Password sudah memenuhi syarat.</p> : null}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                    placeholder="Ulangi password"
                    autoComplete="new-password"
                    required
                  />
                  {confirmError ? <p className="text-xs text-red-600 mt-2">{confirmError}</p> : null}
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full px-6 py-3 rounded-xl text-white transition-colors ${
                    canSubmit ? 'bg-[#1E4AB8] hover:bg-[#1E4AB8]/90' : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {submitting ? 'Menyimpan...' : 'Simpan Password'}
                </button>
              </form>
            ) : (
              <div className="p-6 text-center text-gray-600">Memuat...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
