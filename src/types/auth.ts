export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'farmer' | 'researcher' | 'admin';
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  fullName: string;
  role: string;
}