/**
 * API Service
 * Centralized API communication service for Yayasan Baituljannah
 */

// API Configuration
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

// Storage keys
const TOKEN_KEY = 'baituljannah_token';
const REFRESH_TOKEN_KEY = 'baituljannah_refresh_token';
const USER_KEY = 'baituljannah_user';

/**
 * API Response Interface
 */
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

/**
 * Request Options Interface
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  isFormData?: boolean;
}

/**
 * Get stored token
 */
const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Get stored refresh token
 */
const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Set authentication tokens
 */
const setTokens = (token: string, refreshToken?: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

/**
 * Clear authentication tokens
 */
const clearTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Get stored user
 */
const getStoredUser = (): any => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Set stored user
 */
const setStoredUser = (user: any): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Main API request function
 */
const request = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const { method = 'GET', headers = {}, body, isFormData = false } = options;

  // Build URL
  const url = `${API_BASE_URL}${endpoint}`;

  // Build headers
  const requestHeaders: Record<string, string> = {
    ...headers,
  };

  // Add Content-Type for JSON
  if (!isFormData && body) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  // Add Authorization token
  const token = getToken();
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Build request config
  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  // Add body for POST, PUT, PATCH
  if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    // Handle 401 - Try to refresh token
    if (response.status === 401 && endpoint !== '/auth/refresh') {
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        // Retry original request
        return request(endpoint, options);
      } else {
        // Refresh failed, logout
        clearTokens();
        window.location.href = '/login';
        throw new Error('Session expired');
      }
    }

    // Handle other error responses
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error: any) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Refresh access token
 */
const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      setTokens(data.data.token, data.data.refresh_token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

/**
 * API Service Object
 */
export const api = {
  // ============================================
  // AUTHENTICATION
  // ============================================
  auth: {
    login: async (email: string, password: string, portal?: string) => {
      const response = await request('/auth/login', {
        method: 'POST',
        body: { email, password, portal },
      });
      if (response.success && response.data) {
        setTokens(response.data.token, response.data.refresh_token);
        setStoredUser(response.data.user);
      }
      return response;
    },

    register: async (userData: any) => {
      return request('/auth/register', {
        method: 'POST',
        body: userData,
      });
    },

    logout: async () => {
      try {
        await request('/auth/logout', { method: 'POST' });
      } finally {
        clearTokens();
      }
    },

    getCurrentUser: async () => {
      return request('/auth/me');
    },

    updateProfile: async (userData: any) => {
      return request('/auth/profile', {
        method: 'PUT',
        body: userData,
      });
    },

    changePassword: async (oldPassword: string, newPassword: string) => {
      return request('/auth/change-password', {
        method: 'PUT',
        body: { old_password: oldPassword, new_password: newPassword },
      });
    },
  },

  // ============================================
  // SCHOOL UNITS
  // ============================================
  units: {
    getAll: async () => {
      return request('/units');
    },

    getById: async (id: number) => {
      return request(`/units/${id}`);
    },

    create: async (unitData: any) => {
      return request('/units', {
        method: 'POST',
        body: unitData,
      });
    },

    update: async (id: number, unitData: any) => {
      return request(`/units/${id}`, {
        method: 'PUT',
        body: unitData,
      });
    },

    delete: async (id: number) => {
      return request(`/units/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // USERS
  // ============================================
  users: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/users${query ? `?${query}` : ''}`);
    },

    getById: async (id: number) => {
      return request(`/users/${id}`);
    },

    create: async (userData: any) => {
      return request('/users', {
        method: 'POST',
        body: userData,
      });
    },

    update: async (id: number, userData: any) => {
      return request(`/users/${id}`, {
        method: 'PUT',
        body: userData,
      });
    },

    delete: async (id: number) => {
      return request(`/users/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // STUDENTS
  // ============================================
  students: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/students${query ? `?${query}` : ''}`);
    },

    getById: async (id: number) => {
      return request(`/students/${id}`);
    },

    getAcademic: async (id: number) => {
      return request(`/students/${id}/academic`);
    },

    create: async (studentData: any) => {
      return request('/students', {
        method: 'POST',
        body: studentData,
      });
    },

    update: async (id: number, studentData: any) => {
      return request(`/students/${id}`, {
        method: 'PUT',
        body: studentData,
      });
    },

    delete: async (id: number) => {
      return request(`/students/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // TEACHERS
  // ============================================
  teachers: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/teachers${query ? `?${query}` : ''}`);
    },

    getById: async (id: number) => {
      return request(`/teachers/${id}`);
    },

    getClasses: async (id: number) => {
      return request(`/teachers/${id}/classes`);
    },

    create: async (teacherData: any) => {
      return request('/teachers', {
        method: 'POST',
        body: teacherData,
      });
    },

    update: async (id: number, teacherData: any) => {
      return request(`/teachers/${id}`, {
        method: 'PUT',
        body: teacherData,
      });
    },

    delete: async (id: number) => {
      return request(`/teachers/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // CLASSES
  // ============================================
  classes: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/classes${query ? `?${query}` : ''}`);
    },

    getById: async (id: number) => {
      return request(`/classes/${id}`);
    },

    getStudents: async (id: number) => {
      return request(`/classes/${id}/students`);
    },

    create: async (classData: any) => {
      return request('/classes', {
        method: 'POST',
        body: classData,
      });
    },

    update: async (id: number, classData: any) => {
      return request(`/classes/${id}`, {
        method: 'PUT',
        body: classData,
      });
    },

    delete: async (id: number) => {
      return request(`/classes/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // SUBJECTS
  // ============================================
  subjects: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/subjects${query ? `?${query}` : ''}`);
    },

    getById: async (id: number) => {
      return request(`/subjects/${id}`);
    },

    create: async (subjectData: any) => {
      return request('/subjects', {
        method: 'POST',
        body: subjectData,
      });
    },

    update: async (id: number, subjectData: any) => {
      return request(`/subjects/${id}`, {
        method: 'PUT',
        body: subjectData,
      });
    },

    delete: async (id: number) => {
      return request(`/subjects/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // MATERIALS
  // ============================================
  materials: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/materials${query ? `?${query}` : ''}`);
    },

    getById: async (id: number) => {
      return request(`/materials/${id}`);
    },

    create: async (materialData: FormData) => {
      return request('/materials', {
        method: 'POST',
        body: materialData,
        isFormData: true,
      });
    },

    update: async (id: number, materialData: any) => {
      return request(`/materials/${id}`, {
        method: 'PUT',
        body: materialData,
      });
    },

    delete: async (id: number) => {
      return request(`/materials/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // ASSIGNMENTS
  // ============================================
  assignments: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/assignments${query ? `?${query}` : ''}`);
    },

    getById: async (id: number) => {
      return request(`/assignments/${id}`);
    },

    create: async (assignmentData: any) => {
      return request('/assignments', {
        method: 'POST',
        body: assignmentData,
      });
    },

    submit: async (id: number, submissionData: FormData) => {
      return request(`/assignments/${id}/submit`, {
        method: 'POST',
        body: submissionData,
        isFormData: true,
      });
    },

    grade: async (submissionId: number, gradeData: any) => {
      return request(`/assignments/submissions/${submissionId}/grade`, {
        method: 'PUT',
        body: gradeData,
      });
    },

    update: async (id: number, assignmentData: any) => {
      return request(`/assignments/${id}`, {
        method: 'PUT',
        body: assignmentData,
      });
    },

    delete: async (id: number) => {
      return request(`/assignments/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // GRADES
  // ============================================
  grades: {
    getStudentGrades: async (studentId: number, params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/grades/student/${studentId}${query ? `?${query}` : ''}`);
    },

    getClassGrades: async (classId: number, subjectId: number) => {
      return request(`/grades/class/${classId}/subject/${subjectId}`);
    },

    create: async (gradeData: any) => {
      return request('/grades', {
        method: 'POST',
        body: gradeData,
      });
    },

    update: async (id: number, gradeData: any) => {
      return request(`/grades/${id}`, {
        method: 'PUT',
        body: gradeData,
      });
    },

    delete: async (id: number) => {
      return request(`/grades/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // ATTENDANCE
  // ============================================
  attendance: {
    getAttendance: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/attendance${query ? `?${query}` : ''}`);
    },

    record: async (attendanceData: any) => {
      return request('/attendance', {
        method: 'POST',
        body: attendanceData,
      });
    },

    bulkRecord: async (bulkData: any) => {
      return request('/attendance/bulk', {
        method: 'POST',
        body: bulkData,
      });
    },

    getSummary: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/attendance/summary${query ? `?${query}` : ''}`);
    },
  },

  // ============================================
  // FINANCE
  // ============================================
  finance: {
    getStudentPayments: async (studentId: number, params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/payments/student/${studentId}${query ? `?${query}` : ''}`);
    },

    createPayment: async (paymentData: any) => {
      return request('/payments', {
        method: 'POST',
        body: paymentData,
      });
    },

    processPayment: async (paymentId: number, paymentData: any) => {
      return request(`/payments/${paymentId}/pay`, {
        method: 'POST',
        body: paymentData,
      });
    },

    verifyPayment: async (transactionId: number, verifyData: any) => {
      return request(`/payments/transactions/${transactionId}/verify`, {
        method: 'PUT',
        body: verifyData,
      });
    },

    getReport: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/finance/report${query ? `?${query}` : ''}`);
    },
  },

  // ============================================
  // LIBRARY
  // ============================================
  library: {
    getBooks: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/library/books${query ? `?${query}` : ''}`);
    },

    getBookById: async (id: number) => {
      return request(`/library/books/${id}`);
    },

    borrowBook: async (borrowData: any) => {
      return request('/library/borrow', {
        method: 'POST',
        body: borrowData,
      });
    },

    returnBook: async (borrowId: number, returnData: any) => {
      return request(`/library/borrow/${borrowId}/return`, {
        method: 'PUT',
        body: returnData,
      });
    },

    getBorrowingHistory: async (studentId: number, params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/library/borrow/student/${studentId}${query ? `?${query}` : ''}`);
    },
  },

  // ============================================
  // PPDB (ADMISSION)
  // ============================================
  ppdb: {
    register: async (registrationData: any) => {
      return request('/ppdb/register', {
        method: 'POST',
        body: registrationData,
      });
    },

    checkByNumber: async (registrationNumber: string) => {
      return request(`/ppdb/check/${registrationNumber}`);
    },

    getRegistrations: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/ppdb/registrations${query ? `?${query}` : ''}`);
    },

    updateStatus: async (id: number, statusData: any) => {
      return request(`/ppdb/registrations/${id}/status`, {
        method: 'PUT',
        body: statusData,
      });
    },

    getStatistics: async () => {
      return request('/ppdb/statistics');
    },

    // Legacy endpoints (keep for backward compatibility)
    verify: async (id: number, verifyData: any) => {
      return request(`/ppdb/${id}/verify`, {
        method: 'PUT',
        body: verifyData,
      });
    },

    getByNumber: async (registrationNumber: string) => {
      return request(`/ppdb/registration/${registrationNumber}`);
    },
  },

  // ============================================
  // CAREER (RECRUITMENT)
  // ============================================
  career: {
    getJobs: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/career/jobs${query ? `?${query}` : ''}`);
    },

    getJobById: async (id: number) => {
      return request(`/career/jobs/${id}`);
    },

    apply: async (applicationData: FormData) => {
      return request('/career/apply', {
        method: 'POST',
        body: applicationData,
        isFormData: true,
      });
    },

    getApplications: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/career/applications${query ? `?${query}` : ''}`);
    },

    updateApplicationStatus: async (id: number, statusData: any) => {
      return request(`/career/applications/${id}`, {
        method: 'PUT',
        body: statusData,
      });
    },
  },

  // ============================================
  // CONTENT MANAGEMENT
  // ============================================
  news: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/news${query ? `?${query}` : ''}`);
    },

    getLatest: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/news/latest${query ? `?${query}` : ''}`);
    },

    getById: async (id: number) => {
      return request(`/news/${id}`);
    },

    getBySlug: async (slug: string) => {
      return request(`/news/slug/${slug}`);
    },

    create: async (newsData: any) => {
      return request('/news', {
        method: 'POST',
        body: newsData,
      });
    },

    update: async (id: number, newsData: any) => {
      return request(`/news/${id}`, {
        method: 'PUT',
        body: newsData,
      });
    },

    delete: async (id: number) => {
      return request(`/news/${id}`, {
        method: 'DELETE',
      });
    },
  },

  gallery: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/gallery${query ? `?${query}` : ''}`);
    },

    upload: async (imageData: FormData) => {
      return request('/gallery', {
        method: 'POST',
        body: imageData,
        isFormData: true,
      });
    },

    delete: async (id: number) => {
      return request(`/gallery/${id}`, {
        method: 'DELETE',
      });
    },
  },

  achievements: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/achievements${query ? `?${query}` : ''}`);
    },

    create: async (achievementData: any) => {
      return request('/achievements', {
        method: 'POST',
        body: achievementData,
      });
    },

    update: async (id: number, achievementData: any) => {
      return request(`/achievements/${id}`, {
        method: 'PUT',
        body: achievementData,
      });
    },

    delete: async (id: number) => {
      return request(`/achievements/${id}`, {
        method: 'DELETE',
      });
    },
  },

  programs: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/programs${query ? `?${query}` : ''}`);
    },

    create: async (programData: any) => {
      return request('/programs', {
        method: 'POST',
        body: programData,
      });
    },

    update: async (id: number, programData: any) => {
      return request(`/programs/${id}`, {
        method: 'PUT',
        body: programData,
      });
    },

    delete: async (id: number) => {
      return request(`/programs/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // NOTIFICATIONS
  // ============================================
  notifications: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/notifications${query ? `?${query}` : ''}`);
    },

    markAsRead: async (id: number) => {
      return request(`/notifications/${id}/read`, {
        method: 'PUT',
      });
    },

    markAllAsRead: async () => {
      return request('/notifications/read-all', {
        method: 'PUT',
      });
    },

    delete: async (id: number) => {
      return request(`/notifications/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // MESSAGES
  // ============================================
  messages: {
    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/messages${query ? `?${query}` : ''}`);
    },

    send: async (messageData: any) => {
      return request('/messages', {
        method: 'POST',
        body: messageData,
      });
    },

    reply: async (id: number, replyData: any) => {
      return request(`/messages/${id}/reply`, {
        method: 'POST',
        body: replyData,
      });
    },

    markAsRead: async (id: number) => {
      return request(`/messages/${id}/read`, {
        method: 'PUT',
      });
    },

    delete: async (id: number) => {
      return request(`/messages/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // ============================================
  // CONTACT
  // ============================================
  contact: {
    submit: async (contactData: any) => {
      return request('/contact', {
        method: 'POST',
        body: contactData,
      });
    },

    getAll: async (params?: any) => {
      const query = new URLSearchParams(params).toString();
      return request(`/contact${query ? `?${query}` : ''}`);
    },

    getById: async (id: number) => {
      return request(`/contact/${id}`);
    },

    updateStatus: async (id: number, statusData: any) => {
      return request(`/contact/${id}/status`, {
        method: 'PUT',
        body: statusData,
      });
    },

    delete: async (id: number) => {
      return request(`/contact/${id}`, {
        method: 'DELETE',
      });
    },

    getStatistics: async () => {
      return request('/contact/statistics');
    },
  },
};

// Helper functions
export const apiHelpers = {
  getToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  getStoredUser,
  setStoredUser,
};

export default api;
