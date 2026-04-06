'use client';

import React from 'react';
import { Sidebar } from '../../../components/layout/Sidebar';
import { useNavigationMenu } from '../../../hooks/useNavigationMenu';
import { Inbox, Send, Plus, Search, MailOpen, Trash2, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';

type InboxMessage = { id: string; from: string; subject: string; content: string; date: string; read: boolean };
type OutboxMessage = { id: string; to: string; subject: string; content: string; date: string };

const STORAGE = {
  inbox: 'student_messages_inbox',
  outbox: 'student_messages_outbox',
};

const CHANNEL_NAME = 'student_portal';

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '/api/v1').replace(/\/$/, '');

const nowIso = () => new Date().toISOString();
const getToken = () => {
  try {
    return localStorage.getItem('baituljannah_token');
  } catch {
    return null;
  }
};

export default function StudentMessagesPage() {
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

  const [tab, setTab] = React.useState<'inbox' | 'outbox'>('inbox');
  const [search, setSearch] = React.useState('');

  const [inbox, setInbox] = React.useState<InboxMessage[]>([]);
  const [outbox, setOutbox] = React.useState<OutboxMessage[]>([]);

  const [composeOpen, setComposeOpen] = React.useState(false);
  const [composeTo, setComposeTo] = React.useState('Wali Kelas');
  const [composeSubject, setComposeSubject] = React.useState('');
  const [composeContent, setComposeContent] = React.useState('');

  const loadLocal = React.useCallback(() => {
    try {
      const ib = JSON.parse(localStorage.getItem(STORAGE.inbox) || '[]');
      const ob = JSON.parse(localStorage.getItem(STORAGE.outbox) || '[]');
      setInbox(Array.isArray(ib) ? ib : []);
      setOutbox(Array.isArray(ob) ? ob : []);
    } catch {
      setInbox([]);
      setOutbox([]);
    }
  }, []);

  const persistLocal = React.useCallback(
    (nextInbox: InboxMessage[], nextOutbox: OutboxMessage[]) => {
      localStorage.setItem(STORAGE.inbox, JSON.stringify(nextInbox));
      localStorage.setItem(STORAGE.outbox, JSON.stringify(nextOutbox));
    },
    []
  );

  const fetchFromBackend = React.useCallback(async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 1200);
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE_URL}/messages?student_nis=${encodeURIComponent(student.nis)}`, {
        signal: controller.signal,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) return;
      const payload = await res.json();
      const rows = payload?.data;
      if (!Array.isArray(rows)) return;

      const nextInbox: InboxMessage[] = [];
      const nextOutbox: OutboxMessage[] = [];
      for (const r of rows) {
        if (String(r.direction) === 'in') {
          nextInbox.push({
            id: String(r.id),
            from: String(r.peer || 'Sekolah'),
            subject: String(r.subject || ''),
            content: String(r.content || ''),
            date: String(r.created_at || ''),
            read: Boolean(r.is_read),
          });
        } else {
          nextOutbox.push({
            id: String(r.id),
            to: String(r.peer || 'Sekolah'),
            subject: String(r.subject || ''),
            content: String(r.content || ''),
            date: String(r.created_at || ''),
          });
        }
      }
      setInbox(nextInbox);
      setOutbox(nextOutbox);
      persistLocal(nextInbox, nextOutbox);
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
      if (e.key === STORAGE.inbox || e.key === STORAGE.outbox) loadLocal();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [loadLocal]);

  React.useEffect(() => {
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      const onMessage = (event: MessageEvent) => {
        if (event?.data?.type === 'messages_updated') loadLocal();
        if (event?.data?.type === 'message_received') toast('Pesan baru masuk');
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

  const unreadCount = React.useMemo(() => inbox.filter((m) => !m.read).length, [inbox]);

  const filteredInbox = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return inbox;
    return inbox.filter((m) => `${m.from} ${m.subject} ${m.content}`.toLowerCase().includes(q));
  }, [inbox, search]);

  const filteredOutbox = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return outbox;
    return outbox.filter((m) => `${m.to} ${m.subject} ${m.content}`.toLowerCase().includes(q));
  }, [outbox, search]);

  const markRead = async (id: string) => {
    const next = inbox.map((m) => (m.id === id ? { ...m, read: true } : m));
    setInbox(next);
    persistLocal(next, outbox);
    try {
      const token = getToken();
      await fetch(`${API_BASE_URL}/messages/${encodeURIComponent(id)}/read`, {
        method: 'PUT',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    } catch {}
  };

  const deleteInbox = async (id: string) => {
    const nextInbox = inbox.filter((m) => m.id !== id);
    setInbox(nextInbox);
    persistLocal(nextInbox, outbox);
    try {
      const token = getToken();
      await fetch(`${API_BASE_URL}/messages/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    } catch {}
    toast('Pesan dihapus');
  };

  const deleteOutbox = async (id: string) => {
    const nextOutbox = outbox.filter((m) => m.id !== id);
    setOutbox(nextOutbox);
    persistLocal(inbox, nextOutbox);
    try {
      const token = getToken();
      await fetch(`${API_BASE_URL}/messages/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    } catch {}
    toast('Pesan dihapus');
  };

  const sendMessage = async () => {
    const subject = composeSubject.trim();
    const content = composeContent.trim();
    const to = composeTo.trim();
    if (!to || !subject || !content) {
      toast('Lengkapi tujuan, subjek, dan isi pesan');
      return;
    }

    const id = `msg_${Date.now()}`;
    const createdAt = nowIso();
    const nextOutbox: OutboxMessage[] = [{ id, to, subject, content, date: createdAt }, ...outbox];
    setOutbox(nextOutbox);
    persistLocal(inbox, nextOutbox);

    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'messages_updated' });
      channel.close();
    } catch {}

    toast('Pesan terkirim');

    try {
      const token = getToken();
      await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          student_nis: student.nis,
          direction: 'out',
          peer: to,
          subject,
          content,
          created_at: createdAt,
        }),
      });
    } catch {}

    setComposeOpen(false);
    setComposeSubject('');
    setComposeContent('');
  };

  const simulateIncoming = async () => {
    const id = `msg_in_${Date.now()}`;
    const createdAt = nowIso();
    const msg: InboxMessage = {
      id,
      from: 'Admin Sekolah',
      subject: 'Info Kegiatan',
      content: 'Mohon cek jadwal kegiatan pekan ini di portal.',
      date: createdAt,
      read: false,
    };
    const nextInbox = [msg, ...inbox];
    setInbox(nextInbox);
    persistLocal(nextInbox, outbox);

    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({ type: 'messages_updated' });
      channel.postMessage({ type: 'message_received', id });
      channel.close();
    } catch {}

    try {
      await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_nis: student.nis,
          direction: 'in',
          peer: msg.from,
          subject: msg.subject,
          content: msg.content,
          created_at: createdAt,
        }),
      });
    } catch {}
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Komunikasi</h1>
              <p className="text-gray-600 mt-2">
                Inbox/Outbox untuk {student.name} ({student.class})
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={simulateIncoming} className="btn-outline">
                Simulasi Pesan Masuk
              </button>
              <button onClick={() => setComposeOpen(true)} className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Tulis Pesan
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft">
            <div className="p-6 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTab('inbox')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2 ${
                    tab === 'inbox' ? 'bg-[#1E4AB8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Inbox className="w-4 h-4" />
                  Inbox
                  {unreadCount > 0 ? <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-white/20">{unreadCount}</span> : null}
                </button>
                <button
                  onClick={() => setTab('outbox')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium inline-flex items-center gap-2 ${
                    tab === 'outbox' ? 'bg-[#1E4AB8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  Outbox
                </button>
              </div>

              <div className="relative w-full lg:w-96">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari pesan..."
                  className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                />
              </div>
            </div>

            <div className="p-6">
              {tab === 'inbox' ? (
                <div className="space-y-3">
                  {filteredInbox.length === 0 ? (
                    <div className="text-sm text-gray-600">Inbox kosong.</div>
                  ) : (
                    filteredInbox.map((m) => (
                      <div
                        key={m.id}
                        className={`p-4 rounded-2xl border flex items-start justify-between gap-4 ${
                          m.read ? 'border-gray-200 bg-white' : 'border-[#1E4AB8] bg-[#1E4AB8]/5'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold text-gray-900 truncate">{m.subject}</div>
                            {!m.read ? <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">Baru</span> : null}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Dari: <span className="font-medium">{m.from}</span> • {new Date(m.date).toLocaleString('id-ID')}
                          </div>
                          <div className="text-sm text-gray-700 mt-3 whitespace-pre-wrap break-words">{m.content}</div>
                          {!m.read ? (
                            <button
                              onClick={() => markRead(m.id)}
                              className="mt-3 inline-flex items-center gap-2 text-sm text-[#1E4AB8] hover:underline"
                            >
                              <MailOpen className="w-4 h-4" />
                              Tandai dibaca
                            </button>
                          ) : null}
                        </div>
                        <button onClick={() => deleteInbox(m.id)} className="p-2 rounded-xl hover:bg-red-50 text-red-600" aria-label="Hapus pesan">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOutbox.length === 0 ? (
                    <div className="text-sm text-gray-600">Outbox kosong.</div>
                  ) : (
                    filteredOutbox.map((m) => (
                      <div key={m.id} className="p-4 rounded-2xl border border-gray-200 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 truncate">{m.subject}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Ke: <span className="font-medium">{m.to}</span> • {new Date(m.date).toLocaleString('id-ID')}
                          </div>
                          <div className="text-sm text-gray-700 mt-3 whitespace-pre-wrap break-words">{m.content}</div>
                        </div>
                        <button onClick={() => deleteOutbox(m.id)} className="p-2 rounded-xl hover:bg-red-50 text-red-600" aria-label="Hapus pesan">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {composeOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Tulis Pesan</h3>
              <button onClick={() => setComposeOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Tujuan</label>
                <select
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                >
                  <option>Wali Kelas</option>
                  <option>Guru Mapel</option>
                  <option>Admin TU</option>
                  <option>BK</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Subjek</label>
                <input
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20"
                  placeholder="Masukkan subjek"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Pesan</label>
                <textarea
                  value={composeContent}
                  onChange={(e) => setComposeContent(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-[#1E4AB8] focus:ring-2 focus:ring-[#1E4AB8]/20 min-h-[140px]"
                  placeholder="Tulis pesan..."
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setComposeOpen(false)} className="btn-outline flex-1">
                  Batal
                </button>
                <button onClick={sendMessage} className="btn-primary flex-1">
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
