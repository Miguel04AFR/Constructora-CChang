import { API_CONFIG } from "../config/env";

export const authService = {
  async login(credentials: { gmail: string; password: string }) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el login');
      }

      const data = await response.json();
      
      // nO guardar en localStorage las cookies son suficientes
      return data;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error en logout backend:', error);
    } finally {
      // Limpiar por si hay datos legacy
      localStorage.removeItem('user');
    }
  },

  async validateSession() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/validate`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      return null;
    }
  },

  async refreshToken() {
    try {
      console.log('Llamando a /auth/refresh');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.log('Refresh falló con status:', response.status);
        return null;
      }

      const data = await response.json();
      console.log('Refresh exitoso');
      return data;
    } catch (error) {
      console.error('Error en refreshToken:', error);
      return null;
    }
  },

  getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
    };
  }

  
};