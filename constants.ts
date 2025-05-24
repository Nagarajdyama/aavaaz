
// Application constants
export const APP_NAME = 'Aavaaz';
export const APP_VERSION = '1.0.0';

// API endpoints
export const API = {
  BASE_URL: '/api',
  ROUTES: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
    },
    COMPLAINTS: {
      BASE: '/complaints',
      DETAIL: (id: string) => `/complaints/${id}`,
    },
    DEPARTMENTS: {
      BASE: '/departments',
      DETAIL: (id: string) => `/departments/${id}`,
    },
    USERS: {
      BASE: '/users',
      DETAIL: (id: string) => `/users/${id}`,
    },
  },
};

// Status constants
export const STATUS = {
  SUBMITTED: 'submitted',
  VERIFICATION_PENDING: 'verification_pending',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

// Priority levels
export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

// User roles
export const ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  CITIZEN: 'citizen',
};

// Validation constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  PHONE_REGEX: /^\d{10}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'aavaaz_auth_token',
  USER: 'aavaaz_user',
  THEME: 'aavaaz_theme',
};

// Animation durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};
