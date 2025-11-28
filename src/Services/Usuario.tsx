import { API_CONFIG } from '@/src/config/env'; // URL del backend 
import { Mensaje } from './Mensajes';
import { authService } from '../auth/auth';

export interface Usuario {
  id?: number; // Opcional porque se genera al crear
  nombre: string;
  apellido: string;
  gmail: string;
  password: string;
  telefono: string; 
  mensajes?: Mensaje[];
  fechaNacimiento: Date; 
}

export const usuarioService = {
  // Método para crear usuario
  async crearUsuario(usuario: Usuario) {
    try {
      const responde = await fetch(`${API_CONFIG.BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          gmail: usuario.gmail, 
          password: usuario.password,
          telefono: usuario.telefono,
          fechaNacimiento: usuario.fechaNacimiento
        }),
      });

      if (!responde.ok) {
        const errorData = await responde.json();
        throw new Error(errorData.message || 'Error al crear usuario');
      }

      return await responde.json();
    } catch (error) {
      console.error('Error en usuarioService:', error);
      throw error;
    }
  },


    async eliminarUsuario(id: number) {
    try {

       const token = authService.getToken();
      
      if (!token) {
        throw new Error('No estás autenticado');
      }
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar usuario');
      }

       if (response.status === 204) {
      return { success: true, message: 'Usuario eliminado correctamente' };
    }

      return await response.json();
    } catch (error) {
      console.error('Error en usuarioService:', error);
      throw error;
    }
  },



   async obtenerUsuarios() {
    try {
    
      const token = authService.getToken();
      
      if (!token) {
        throw new Error('No estás autenticado');
      }
      const response = await fetch(`${API_CONFIG.BASE_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('No tienes permisos para ver usuarios');
      }

      return await response.json();
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  },
};