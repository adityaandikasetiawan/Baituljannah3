'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '../../components/layout/Navbar';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { useNavigationMenu } from '../../hooks/useNavigationMenu';
import { Toaster, toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { menuItems } = useNavigationMenu();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'teacher' | 'student' | 'parent'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const toRoleCookie = (role: string | undefined, fallback: typeof userType) => {
    const r = String(role || '').toLowerCase();
    if (r === 'admin') return 'admin';
    if (r === 'guru') return 'teacher';
    if (r === 'siswa') return 'student';
    if (r === 'ortu') return 'parent';
    return fallback;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || '/api/v1').replace(/\/$/, '');
    const fallbackRoleCookie = userType;

    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success && data?.data?.token) {
        localStorage.setItem('baituljannah_token', data.data.token);
        if (data.data.user) {
          localStorage.setItem('baituljannah_user', JSON.stringify(data.data.user));
        }

        const roleFromApi: string | undefined = data.data.user?.role;
        const roleCookie = toRoleCookie(roleFromApi, fallbackRoleCookie);
        document.cookie = `role=${roleCookie}; path=/; SameSite=Lax`;

        if (roleFromApi === 'admin') router.push('/admin/dashboard');
        else if (roleFromApi === 'guru') router.push('/teacher/dashboard');
        else if (roleFromApi === 'ortu') router.push('/parent/dashboard');
        else router.push('/student/dashboard');

        toast.success('Login berhasil');
        return;
      }

      const message = data?.message || 'Login gagal';
      toast.error(message);
    } catch (error: any) {
      toast.error('Tidak bisa terhubung ke server. Menggunakan mode demo.');
    }

    document.cookie = `role=${fallbackRoleCookie}; path=/; SameSite=Lax`;
    switch (userType) {
      case 'admin':
        router.push('/admin/dashboard');
        break;
      case 'teacher':
        router.push('/teacher/dashboard');
        break;
      case 'student':
        router.push('/student/dashboard');
        break;
      case 'parent':
        router.push('/parent/dashboard');
        break;
    }
  };

  const userTypes = [
    {
      id: 'student',
      label: 'Siswa',
      icon: '👨‍🎓',
      color: 'from-blue-500 to-blue-600',
      description: 'Login sebagai siswa'
    },
    {
      id: 'parent',
      label: 'Orang Tua',
      icon: '👨‍👩‍👧',
      color: 'from-green-500 to-green-600',
      description: 'Login sebagai wali murid'
    },
    {
      id: 'teacher',
      label: 'Guru',
      icon: '👨‍🏫',
      color: 'from-purple-500 to-purple-600',
      description: 'Login sebagai guru'
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: '👤',
      color: 'from-orange-500 to-orange-600',
      description: 'Login sebagai admin'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      <Toaster position="top-right" richColors />
      <Navbar 
        siteName="Login - Baituljannah"
        accentColor="#1E4AB8"
        menuItems={menuItems}
      />

      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E4AB8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 relative z-10">
        <div className="w-full max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Branding */}
            <div className="hidden md:block">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                    <span className="text-4xl">🕌</span>
                  </div>
                  <h1 className="text-4xl mb-4 font-bold text-gray-800">
                    Yayasan <span className="text-[#1E4AB8]">Baituljannah</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    Sistem Manajemen Sekolah Islam Terpadu
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600">✓</span>
                      </div>
                      <span>Pendidikan Berkualitas Islami</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600">✓</span>
                      </div>
                      <span>5 Unit Pendidikan Lengkap</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600">✓</span>
                      </div>
                      <span>Guru Professional & Berpengalaman</span>
                    </div>
                  </div>
                </div>

                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1643429096345-9de0d2ab7e7c"
                    alt="Baituljannah School"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              {/* Mobile Logo */}
              <div className="md:hidden mb-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1E4AB8] to-[#8B5CF6] rounded-3xl flex items-center justify-center mb-4 shadow-lg mx-auto">
                  <span className="text-3xl">🕌</span>
                </div>
                <h1 className="text-2xl mb-2 font-bold text-gray-800">
                  Yayasan <span className="text-[#1E4AB8]">Baituljannah</span>
                </h1>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl mb-2 font-bold text-gray-800">Selamat Datang! 👋</h2>
                <p className="text-gray-600">Silakan login untuk melanjutkan</p>
              </div>

              {/* User Type Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Login Sebagai:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setUserType(type.id as any)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        userType === type.id
                          ? 'border-[#1E4AB8] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center text-2xl shadow-sm`}>
                          {type.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{type.label}</p>
                          <p className="text-xs text-gray-500">{type.description}</p>
                        </div>
                      </div>
                      {userType === type.id && (
                        <div className="mt-2 flex justify-end">
                          <div className="w-6 h-6 rounded-full bg-[#1E4AB8] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email/Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {userType === 'student' ? 'NIS / Email' : 'Email / Username'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={userType === 'student' ? 'Masukkan NIS atau Email' : 'Masukkan email atau username'}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Masukkan password"
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-[#1E4AB8] rounded border-gray-300 focus:ring-[#1E4AB8]" />
                    <span className="text-sm text-gray-600">Ingat saya</span>
                  </label>
                  <button type="button" className="text-sm text-[#1E4AB8] hover:underline">
                    Lupa password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#1E4AB8] to-[#8B5CF6] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 group font-medium"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login Sekarang</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">atau</span>
                </div>
              </div>

              {/* Back to Homepage */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="text-gray-600 hover:text-[#1E4AB8] transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Kembali ke Beranda</span>
                </button>
              </div>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Demo Credentials:</strong>
                </p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• <strong>Siswa:</strong> NIS 2024001 / password: demo</p>
                  <p>• <strong>Orang Tua:</strong> parent@demo.com / password: demo</p>
                  <p>• <strong>Guru:</strong> teacher@demo.com / password: demo</p>
                  <p>• <strong>Admin:</strong> admin@demo.com / password: demo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>© 2024 Yayasan Baituljannah. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
