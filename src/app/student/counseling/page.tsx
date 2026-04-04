'use client';

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Calendar, Clock, Trash2, Users, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';

type Counselor = { id: string; name: string; specialty: string };
type Booking = { id: string; counselorId: string; date: string; time: string; topic: string; status: 'booked' | 'cancelled' };

const STORAGE = {
  bookings: 'student_bk_bookings',
};

const CHANNEL_NAME = 'student_portal';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

const isoToday = () => new Date().toISOString().slice(0, 10);

export default function StudentCounselingPage() {
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

  const [counselors, setCounselors] = React.useState<Counselor[]>([
    { id: 'bk-1', name: 'Ustadzah Siti', specialty: 'Akademik' },
    { id: 'bk-2', name: 'Ustadz Ahmad', specialty: 'Karir' },
    { id: 'bk-3', name: 'Ustadzah Fatimah', specialty: 'Kedisiplinan' },
  ]);

  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [showBookingModal, setShowBookingModal] = React.useState(false);
  const [selectedCounselorId, setSelectedCounselorId] = React.useState(counselors[0]?.id || 'bk-1');
  const [selectedDate, setSelectedDate] = React.useState(isoToday());
  const [selectedTime, setSelectedTime] = React.useState('10:00');
  const [topic, setTopic] = React.useState('');

  const timeSlots = ['08:00', '09:00', '10:00', '13:30', '15:00'];

  const loadLocal = React.useCallback(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE.bookings) || '[]');
      setBookings(Array.isArray(raw) ? raw : []);
    } catch {
      setBookings([]);
    }
  }, []);

  const persistLocal = React.useCallback((next: Booking[]) => {
    localStorage.setItem(STORAGE.bookings, JSON.stringify(next));
  }, []);

  const fetchFromBackend = React.useCallback(async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 1200);
    try {
      const [cRes, bRes] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/counseling/counselors`, { signal: controller.signal }),
        fetch(`${API_BASE_URL}/counseling/bookings?student_nis=${encodeURIComponent(student.nis)}`, { signal: controller.signal }),
      ]);

      if (cRes.status === 'fulfilled' && cRes.value.ok) {
        const payload = await cRes.value.json();
        const serverCounselors = payload?.data;
        if (Array.isArray(serverCounselors) && serverCounselors.length > 0) {
          const next = serverCounselors.map((c: any) => ({
            id: String(c.id),
            name: String(c.name),
            specialty: String(c.specialty),
          }));
          setCounselors(next);
          if (!next.some((x) => x.id === selectedCounselorId)) setSelectedCounselorId(next[0]?.id || 'bk-1');
        }
      }

      if (bRes.status === 'fulfilled' && bRes.value.ok) {
        const payload = await bRes.value.json();
        const serverBookings = payload?.data;
        if (Array.isArray(serverBookings)) {
          const next: Booking[] = serverBookings.map((b: any) => ({
            id: String(b.id),
            counselorId: String(b.counselor_id),
            date: String(b.date),
            time: String(b.time),
            topic: String(b.topic || ''),
            status: (String(b.status) === 'cancelled' ? 'cancelled' : 'booked') as Booking['status'],
          }));
          setBookings(next);
          persistLocal(next);
        }
      }
    } catch {
    } finally {
      window.clearTimeout(timeout);
    }
  }, [persistLocal, selectedCounselorId, student.nis]);

  React.useEffect(() => {
    loadLocal();
  }, [loadLocal]);

  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE.bookings) loadLocal();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [loadLocal]);

  React.useEffect(() => {
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      const onMessage = (event: MessageEvent) => {
        if (event?.data?.type === 'bk_updated') loadLocal();
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

  const isSlotTaken = React.useCallback(
    (counselorId: string, date: string, time: string) => {
      return bookings.some((b) => b.status === 'booked' && b.counselorId === counselorId && b.date === date && b.time === time);
    },
    [bookings]
  );

  const createBooking = async () => {
    if (isSlotTaken(selectedCounselorId, selectedDate, selectedTime)) {
      toast('Slot sudah terisi');
      return;
    }

    const id = `bk_${Date.now()}`;
    const next: Booking[] = [
      { id, counselorId: selectedCounselorId, date: selectedDate, time: selectedTime, topic: topic.trim(), status: 'booked' },
      ...bookings,
    ];
    setBookings(next);
    persistLocal(next);

    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'bk_updated' });
      channel.close();
    } catch {}

    toast('Jadwal konseling berhasil dibooking');

    try {
      await fetch(`${API_BASE_URL}/counseling/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_nis: student.nis,
          counselor_id: selectedCounselorId,
          date: selectedDate,
          time: selectedTime,
          topic: topic.trim(),
        }),
      });
    } catch {}

    setShowBookingModal(false);
    setTopic('');
  };

  const cancelBooking = async (id: string) => {
    const next = bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
    setBookings(next);
    persistLocal(next);

    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'bk_updated' });
      channel.close();
    } catch {}

    toast('Booking dibatalkan');

    try {
      await fetch(`${API_BASE_URL}/counseling/bookings/${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch {}
  };

  const activeBookings = React.useMemo(() => bookings.filter((b) => b.status === 'booked'), [bookings]);
  const selectedCounselor = counselors.find((c) => c.id === selectedCounselorId) || counselors[0];

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
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">BK / Konseling</h1>
              <p className="text-gray-600 mt-2">
                Booking jadwal konseling untuk {student.name} ({student.class})
              </p>
            </div>
            <button onClick={() => setShowBookingModal(true)} className="btn-primary">
              Booking Jadwal
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-6 h-6 text-[#1E4AB8]" />
                  <h2 className="text-xl font-semibold">Jadwal Saya</h2>
                </div>

                {activeBookings.length === 0 ? (
                  <div className="text-sm text-gray-600">Belum ada booking aktif.</div>
                ) : (
                  <div className="space-y-3">
                    {activeBookings.map((b) => {
                      const c = counselors.find((x) => x.id === b.counselorId);
                      return (
                        <div key={b.id} className="p-4 border border-gray-200 rounded-2xl flex items-start justify-between gap-4">
                          <div>
                            <div className="font-semibold text-gray-900">{c ? c.name : 'Konselor'}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {b.date} • {b.time} • {c ? c.specialty : '-'}
                            </div>
                            {b.topic ? <div className="text-sm text-gray-600 mt-2">Topik: {b.topic}</div> : null}
                          </div>
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="p-2 rounded-xl hover:bg-red-50 text-red-600"
                            aria-label="Batalkan booking"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#1E4AB8]" />
                  <h2 className="text-lg font-semibold text-gray-900">Konselor</h2>
                </div>
                <div className="space-y-3">
                  {counselors.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl border border-gray-200">
                      <div className="font-medium text-gray-900">{c.name}</div>
                      <div className="text-sm text-gray-600">{c.specialty}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Alur</h2>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>1) Pilih konselor, tanggal, dan slot waktu</div>
                  <div>2) Booking disimpan dan muncul di “Jadwal Saya”</div>
                  <div>3) Notifikasi muncul ketika booking dibuat / dibatalkan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Booking Konseling</h3>
              <button onClick={() => setShowBookingModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Konselor</label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  value={selectedCounselorId}
                  onChange={(e) => setSelectedCounselorId(e.target.value)}
                >
                  {counselors.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.specialty})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Tanggal</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      min={isoToday()}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Waktu</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <select
                      className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      {timeSlots.map((t) => (
                        <option key={t} value={t} disabled={isSlotTaken(selectedCounselorId, selectedDate, t)}>
                          {t} {isSlotTaken(selectedCounselorId, selectedDate, t) ? '(Terisi)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Topik</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 min-h-[110px]"
                  placeholder="Jelaskan topik konseling..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="p-4 rounded-2xl bg-gray-50">
                <div className="text-sm text-gray-700">
                  Booking: <span className="font-medium">{selectedCounselor ? selectedCounselor.name : '-'}</span> • {selectedDate} • {selectedTime}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowBookingModal(false)} className="btn-outline flex-1">
                  Batal
                </button>
                <button onClick={createBooking} className="btn-primary flex-1">
                  Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
