import { API_CONFIG } from '@/src/config/env'; // URL del backend 
import { Mensaje } from './Mensajes';

export interface Usuario {
  id?: string; // Opcional porque se genera al crear
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


  async obtenerUsuarios() {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users`);
      return await response.json();
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  }
};