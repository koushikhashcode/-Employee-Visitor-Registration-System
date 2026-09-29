import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 6000,
});

const LOCAL_STORAGE_KEY = 'frontdesk_visitors_backup_v1';

const getInitialSeed = () => [
  {
    id: 'seed-01',
    name: 'Sarah Jenkins',
    mobile: '9876543210',
    organization: 'Acme Technologies Inc.',
    personToMeet: 'Alex Rivera (VP Engineering)',
    purpose: 'Meeting',
    visitedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-02',
    name: 'David Chen',
    mobile: '9123456780',
    organization: 'Stanford University',
    personToMeet: 'Elena Rostova (HR Lead)',
    purpose: 'Interview',
    visitedAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-03',
    name: 'Marcus Vance',
    mobile: '9845012345',
    organization: 'DHL Express Logistics',
    personToMeet: 'Reception Desk / Ops',
    purpose: 'Delivery',
    visitedAt: new Date(Date.now() - 140 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-04',
    name: 'Priya Sharma',
    mobile: '9988776655',
    organization: 'Apex Facility Management',
    personToMeet: 'Thomas Wright (Operations)',
    purpose: 'Maintenance',
    visitedAt: new Date(Date.now() - 210 * 60 * 1000).toISOString(),
  },
  {
    id: 'seed-05',
    name: 'Robert Miller',
    mobile: '9765432109',
    organization: 'Kite Design Studio',
    personToMeet: 'Alex Rivera (VP Engineering)',
    purpose: 'Meeting',
    visitedAt: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
  },
];

function getLocalFallback() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      const initial = getInitialSeed();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return getInitialSeed();
  }
}

function saveLocalFallback(data) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not write to localStorage:', e);
  }
}

export async function getVisitors(search = '') {
  try {
    const response = await apiClient.get('/visitors', {
      params: search ? { search } : {},
    });
    if (response.data?.data && Array.isArray(response.data.data)) {
      saveLocalFallback(response.data.data);
    }
    return response.data;
  } catch (error) {
    console.warn('[API Client] Server endpoint unreachable, serving from local client cache:', error);
    let list = getLocalFallback();
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.mobile.includes(q) ||
          v.organization.toLowerCase().includes(q) ||
          v.personToMeet.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime());
    return { data: list, count: list.length, source: 'offline-cache' };
  }
}

export async function getVisitorById(id) {
  try {
    const response = await apiClient.get(`/visitors/${id}`);
    return response.data.data;
  } catch (error) {
    const list = getLocalFallback();
    const item = list.find((v) => v.id === id);
    if (!item) throw new Error('Visitor record not found in storage');
    return item;
  }
}

export async function createVisitor(formData) {
  try {
    const response = await apiClient.post('/visitors', formData);
    return response.data.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      throw error;
    }
    const list = getLocalFallback();
    const newVisitor = {
      id: `local_${Date.now().toString(36)}`,
      ...formData,
      visitedAt: new Date().toISOString(),
    };
    list.unshift(newVisitor);
    saveLocalFallback(list);
    return newVisitor;
  }
}

export async function updateVisitor(id, formData) {
  try {
    const response = await apiClient.put(`/visitors/${id}`, formData);
    return response.data.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      throw error;
    }
    const list = getLocalFallback();
    const idx = list.findIndex((v) => v.id === id);
    if (idx === -1) throw new Error('Visitor record not found');
    list[idx] = {
      ...list[idx],
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    saveLocalFallback(list);
    return list[idx];
  }
}

export async function deleteVisitor(id) {
  try {
    await apiClient.delete(`/visitors/${id}`);
  } catch (error) {
    const list = getLocalFallback();
    const filtered = list.filter((v) => v.id !== id);
    saveLocalFallback(filtered);
  }
}

export async function getTodayStats() {
  try {
    const response = await apiClient.get('/visitors/stats/today');
    return response.data.data;
  } catch (error) {
    const list = getLocalFallback();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const todayCount = list.filter(
      (v) => new Date(v.visitedAt).getTime() >= startOfToday.getTime()
    ).length;
    const sorted = [...list].sort(
      (a, b) => new Date(b.visitedAt).getTime() - new Date(a.visitedAt).getTime()
    );
    const latest = sorted[0] || null;

    return {
      todayCount,
      totalCount: list.length,
      latestVisitor: latest
        ? {
            id: latest.id,
            name: latest.name,
            organization: latest.organization,
            purpose: latest.purpose,
            visitedAt: latest.visitedAt,
          }
        : null,
    };
  }
}

export async function exportVisitorsCsv(search = '') {
  try {
    const response = await apiClient.get('/visitors/export/csv', {
      params: search ? { search } : {},
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `visitors-register-${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    const list = getLocalFallback();
    const headers = ['Visitor Name', 'Mobile Number', 'Organization', 'Person to Meet', 'Purpose', 'Check-In Timestamp'];
    const rows = list.map((v) => [
      `"${v.name.replace(/"/g, '""')}"`,
      `"${v.mobile}"`,
      `"${v.organization.replace(/"/g, '""')}"`,
      `"${v.personToMeet.replace(/"/g, '""')}"`,
      `"${v.purpose}"`,
      `"${new Date(v.visitedAt).toISOString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `visitors-backup-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
}

export async function checkHealth() {
  try {
    const res = await apiClient.get('/health');
    return res.data;
  } catch {
    return { status: 'offline-mode' };
  }
}
