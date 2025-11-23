import { API_CONFIG } from "../config/env";
import { Usuario } from "./Usuario";

export interface Mensaje{
  id?: string;
    tipo: string;
    motivo: string;
    gmail:string;
    telefono: string
    user: Usuario;

}
    export const mensajeService = {
      async crearUsuario(mensaje: Mensaje) {
        try {
          const responde = await fetch(`${API_CONFIG.BASE_URL}/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo: mensaje.tipo,
                motivo: mensaje.motivo,
                user: mensaje.user,
                gmail: mensaje.gmail,
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
    
    
      async obtenerMensajes() {
        try {
          const response = await fetch(`${API_CONFIG.BASE_URL}/users`);
          return await response.json();
        } catch (error) {
          console.error('Error obteniendo usuarios:', error);
          throw error;
        }
      }
    }