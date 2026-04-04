'use client';

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Calendar, MapPin, Users, X, Zap } from 'lucide-react';
import { Toaster, toast } from 'sonner';

type ExkulActivity = {
  id: string;
  name: string;
  day: string;
  time: string;
  location: string;
  quota: number;
};

const STORAGE = {
  registered: 'student_extracurricular',
};

const CHANNEL_NAME = 'student_portal';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

export default function StudentExtracurricularPage() {
  const { menuItems } = useNavigationMenu('student');

  const student = React.useMemo(
    () => ({
      nis: '2024001',
      name: 'Muhammad Rizki Pratama',
      class: 'XII IPA 1',
      unit: 'SMAIT',
    }),
    []
  );

  const [activities, setActivities] = React.useState<ExkulActivity[]>([
    { id: 'basket', name: 'Basket', day: 'Rabu', time: '15:30', location: 'Lapangan', quota: 30 },
    { id: 'paskibra', name: 'Paskibra', day: 'Selasa', time: '15:30', location: 'Lapangan', quota: 40 },
    { id: 'tahfidz', name: 'Tahfidz', day: 'Kamis', time: '16:00', location: 'Masjid', quota: 50 },
    { id: 'englishclub', name: 'English Club', day: 'Senin', time: '15:30', location: 'R. Bahasa', quota: 25 },
  ]);

  const [registeredIds, setRegisteredIds] = React.useState<string[]>([]);
  const [confirmId, setConfirmId] = React.useState<string | null>(null);

  const loadLocal = React.useCallback(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE.registered) || '[]');
      setRegisteredIds(Array.isArray(raw) ? raw : []);
    } catch {
      setRegisteredIds([]);
    }
  }, []);

  const persistLocal = React.useCallback((next: string[]) => {
    localStorage.setItem(STORAGE.registered, JSON.stringify(next));
  }, []);

  const fetchFromBackend = React.useCallback(async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 1200);
    try {
      const [actRes, regRes] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/extracurricular/activities`, { signal: controller.signal }),
        fetch(`${API_BASE_URL}/extracurricular/registrations?student_nis=${encodeURIComponent(student.nis)}`, {
          signal: controller.signal,
        }),
      ]);

      if (actRes.status === 'fulfilled' && actRes.value.ok) {
        const payload = await actRes.value.json();
        const serverActivities = payload?.data;
        if (Array.isArray(serverActivities) && serverActivities.length > 0) {
          setActivities(
            serverActivities.map((a: any) => ({
              id: String(a.id),
              name: String(a.name),
              day: String(a.day),
              time: String(a.time),
              location: String(a.location),
              quota: Number(a.quota),
            }))
          );
        }
      }

      if (regRes.status === 'fulfilled' && regRes.value.ok) {
        const payload = await regRes.value.json();
        const serverRegs = payload?.data;
        if (Array.isArray(serverRegs)) {
          const next = serverRegs.map((r: any) => String(r.activity_id)).filter(Boolean);
          setRegisteredIds(next);
          persistLocal(next);
        }
      }
    } catch {
    } finally {
      window.clearTimeout(timeout);
    }
  }, [persistLocal, student.nis]);

  React.useEffect(() => {
    loadLocal();
  }, [loadLocal]);

  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE.registered) loadLocal();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [loadLocal]);

  React.useEffect(() => {
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      const onMessage = (event: MessageEvent) => {
        if (event?.data?.type === 'exkul_updated') loadLocal();
      };
      channel.addEventListener('message', onMessage);
      return () => {
        channel.removeEventListener('message', onMessage);
        channel.close();
      };
    } catch {
      return;
    }
  }, [loadLocal]);

  React.useEffect(() => {
    fetchFromBackend();
  }, [fetchFromBackend]);

  const register = async (activityId: string) => {
    const next = registeredIds.includes(activityId)
      ? registeredIds.filter((x) => x !== activityId)
      : [...registeredIds, activityId];
    setRegisteredIds(next);
    persistLocal(next);

    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'exkul_updated' });
      channel.close();
    } catch {}

    const isNowRegistered = next.includes(activityId);
    toast(isNowRegistered ? 'Ekskul berhasil didaftarkan' : 'Pendaftaran ekskul dibatalkan');

    try {
      if (isNowRegistered) {
        await fetch(`${API_BASE_URL}/extracurricular/registrations`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ student_nis: student.nis, activity_id: activityId }),
        });
      } else {
        await fetch(`${API_BASE_URL}/extracurricular/registrations`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ student_nis: student.nis, activity_id: activityId }),
        });
      }
    } catch {}
  };

  const mySchedule = React.useMemo(() => {
    const selected = activities.filter((a) => registeredIds.includes(a.id));
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    return [...selected].sort((a, b) => {
      const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
      if (dayDiff !== 0) return dayDiff;
      return a.time.localeCompare(b.time);
    });
  }, [activities, registeredIds]);

  const confirmActivity = confirmId ? activities.find((a) => a.id === confirmId) : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      <Sidebar
        menuItems={menuItems}
        accentColor="#1E4AB8"
        userRole="Siswa"
        userName={student.name}
        panelTitle="Portal Siswa"
        panelSubtitle={`${student.unit} • ${student.class}`}
      />

      <main className="flex-1 p-6 md:p-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ekstrakurikuler</h1>
              <p className="text-gray-600 mt-2">
                Pendaftaran & jadwal ekskul untuk {student.name} ({student.class})
              </p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl shadow-soft">
              <div className="text-sm text-gray-500">Ekskul Diikuti</div>
              <div className="text-2xl font-bold text-[#1E4AB8]">{registeredIds.length}</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-6 h-6 text-[#1E4AB8]" />
                  <h2 className="text-xl font-semibold">Daftar Ekskul</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {activities.map((a) => {
                    const active = registeredIds.includes(a.id);
                    return (
                      <div
                        key={a.id}
                        className={`p-4 rounded-2xl border transition-colors ${
                          active ? 'border-[#1E4AB8] bg-[#1E4AB8]/5' : 'border-gray-200 hover:border-[#1E4AB8]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-gray-900">{a.name}</div>
                          {active && <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Terdaftar</span>}
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {a.day}, {a.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{a.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>Kuota: {a.quota}</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() => (active ? register(a.id) : setConfirmId(a.id))}
                            className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                              active ? 'bg-white border border-[#1E4AB8] text-[#1E4AB8] hover:bg-[#1E4AB8]/10' : 'bg-[#1E4AB8] text-white hover:bg-[#1a3d9a]'
                            }`}
                          >
                            {active ? 'Batalkan' : 'Daftar'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Jadwal Saya</h2>
                {mySchedule.length === 0 ? (
                  <div className="text-sm text-gray-600">Belum ada ekskul yang diikuti.</div>
                ) : (
                  <div className="space-y-3">
                    {mySchedule.map((a) => (
                      <div key={a.id} className="p-3 rounded-xl border border-gray-200">
                        <div className="font-medium text-gray-900">{a.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {a.day}, {a.time} • {a.location}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Alur</h2>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>1) Pilih ekskul</div>
                  <div>2) Konfirmasi pendaftaran</div>
                  <div>3) Jadwal otomatis masuk ke “Jadwal Saya”</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {confirmActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Konfirmasi Pendaftaran</h3>
              <button onClick={() => setConfirmId(null)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-gray-50">
                <div className="font-semibold text-gray-900">{confirmActivity.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {confirmActivity.day}, {confirmActivity.time} • {confirmActivity.location}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Pastikan jadwal tidak berbenturan dengan kegiatan lain. Anda dapat membatalkan pendaftaran kapan saja.
              </div>
              <div className="flex gap-3">
                <button onClick={() => setConfirmId(null)} className="btn-outline flex-1">
                  Batal
                </button>
                <button
                  onClick={async () => {
                    const id = confirmActivity.id;
                    setConfirmId(null);
                    await register(id);
                  }}
                  className="btn-primary flex-1"
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
