export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  password?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
