// import { create } from 'zustand';

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   points: number;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   setUser: (user: User | null) => void;
//   setToken: (token: string | null) => void;
//   setError: (error: string | null) => void;
//   signUp: (email: string, password: string, name: string, phone: string) => Promise<void>;
//   signIn: (email: string, password: string) => Promise<void>;
//   signOut: () => void;
// }

// const API_URL = 'http://localhost:5000/api';

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   token: localStorage.getItem('token'),
//   loading: false,
//   error: null,

//   setUser: (user) => set({ user }),
//   setToken: (token) => {
//     if (token) {
//       localStorage.setItem('token', token);
//     } else {
//       localStorage.removeItem('token');
//     }
//     set({ token });
//   },
//   setError: (error) => set({ error }),

//   signUp: async (email, password, name, phone) => {
//     try {
//       set({ loading: true, error: null });
      
//       const response = await fetch(`${API_URL}/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, name, phone })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Error durante el registro');
//       }

//       set({ user: data.user });
//       set({ token: data.token });
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         set({ error: error.message });
//       } else {
//         set({ error: 'An unknown error occurred' });
//       }
//     } finally {
//       set({ loading: false });
//     }
//   },

//   signIn: async (email, password) => {
//     try {
//       set({ loading: true, error: null });
      
//       const response = await fetch(`${API_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Error durante el inicio de sesión');
//       }

//       set({ user: data.user });
//       set({ token: data.token });
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         set({ error: error.message });
//       } else {
//         set({ error: 'An unknown error occurred' });
//       }
//     } finally {
//       set({ loading: false });
//     }
//   },

//   signOut: () => {
//     localStorage.removeItem('token');
//     set({ user: null, token: null, error: null });
//   }
// }));