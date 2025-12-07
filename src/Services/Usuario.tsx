import { API_CONFIG } from '@/src/config/env'; // URL del backend 
import { Mensaje } from './Mensajes';
import { authService } from '../auth/auth';
import { AscenderUsuario } from '../components/ascender/ascenderUsuario';
import { updateTag } from 'next/cache';

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
      const responde = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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

    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', //esto envia las cookies automaticamente 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar usuario');
    }

    if (response.status === 204) {
      return { success: true, message: 'Usuario eliminado correctamente' };
    }
    
    
  } catch (error) {
    console.error('Error en usuarioService:', error);
    throw error;
  }
},



   async obtenerUsuarios() {
    try {
    

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: {
          'Content-Type': 'application/json',

        },
        credentials: 'include',
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

  async AscenderUsuario(gmail: string) {
  try {


    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/ascender/${gmail}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      //No necesita body porque todo va en la URL
    });

    if (!response.ok) {
      const errorData = await response.json();

      switch (response.status) {
        case 404:
          throw new Error(`Usuario con gmail ${gmail} no encontrado`);
        case 409:
          throw new Error(`El usuario ${gmail} ya es administrador`);
        case 403:
          throw new Error('No tienes permisos (solo superAdmin puede ascender usuarios)');
        case 401:
          throw new Error('Sesión expirada. Por favor, vuelve a iniciar sesión');
        default:
          throw new Error(errorData.message || `Error ${response.status}: No se pudo ascender al usuario`);
      }
    }

    const resultado = await response.json();
    
    return {
      success: true,
      message: `Usuario ascendido exitosamente a administrador`,
      usuario: resultado
    };

  } catch (error: any) {
    console.error('Error ascendiendo usuario:', error);
    throw error;
  }
},

async updateUsuario(id: number, updateData: Partial<Usuario>) {
    try {


      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: 'PATCH',
         headers: {
        'Content-Type': 'application/json',
      },
      
        body: JSON.stringify(updateData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar usuario');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en usuarioService:', error);
      throw error;
    }
    

  },
};