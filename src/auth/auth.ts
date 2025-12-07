import { API_CONFIG } from "../config/env";

// Helper function to safely parse JSON from response
async function parseJSON(response: Response) {
  const contentType = response.headers.get('content-type');
  const text = await response.text();
  
  if (!contentType || !contentType.includes('application/json')) {
    console.error(`Backend Error - Status: ${response.status}, Content-Type: ${contentType}`);
    console.error(`Response text: ${text.substring(0, 200)}`);
    throw new Error(`Expected JSON but received: ${contentType || 'unknown'}. Status: ${response.status}. API: ${API_CONFIG.BASE_URL}`);
  }
  
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Failed to parse JSON: ${e}`);
  }
}

export const authService = {
  async login(credentials: { gmail: string; password: string }) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await parseJSON(response);
        throw new Error(errorData.message || 'Error en el login');
      }

      const data = await parseJSON(response);
      
      // nO guardar en localStorage las cookies son suficientes
      return data;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await fetch(`${API_CONFIG.BASE_URL}/auth/logout`, {
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
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/validate`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        return null;
      }

      const data = await parseJSON(response);
      return data.user;
    } catch (error) {
      return null;
    }
  },

  async refreshToken() {
    try {
      console.log('Llamando a /auth/refresh');
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/refresh`, {
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

      const data = await parseJSON(response);
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