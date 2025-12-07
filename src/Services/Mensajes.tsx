import { authService } from "../auth/auth";
import { API_CONFIG } from "../config/env";
import { Usuario } from "./Usuario";

export interface Mensaje{
  id?: string;
    tipo: string;
    motivo: string;
    gmail:string;
    telefono: string;
    user?: Usuario;
}
    export const mensajeService = {
      async crearMensaje(mensaje: Mensaje) {
        try {

          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mensajes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               //'Authorization': `Bearer ${token}`//sin esto el getUser no iba a funcionar XD
            },
            credentials: 'include',
            body: JSON.stringify({
                tipo: mensaje.tipo,
                motivo: mensaje.motivo,
                gmail: mensaje.gmail,
                telefono: mensaje.telefono
            }),
          });
    
       /*   if (!response.ok) {
            const errorData = await response.json();
            console.log(token);
            throw new Error(errorData.message || 'Error al crear mensaje');

              
          }
    */
          return await response.json();
        } catch (error) {
          console.error('Error en usuarioService:', error);
          throw error;
        }
      },
    
    
      async obtenerMensajes() {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mensajes`, { 
        headers: {

        },
        credentials: 'include',
      });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener mesnajes');
          }

          return await response.json();
        } catch (error) {
          console.error('Error obteniendo usuarios:', error);
          throw error;
        }
      },

      async eliminarMensaje(id: number) {
          try {
      

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mensajes/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Error al eliminar mensaje');
            }
      
             if (response.status === 204) {
            return { success: true, message: 'Mensaje eliminado correctamente' };
          }
      
            return await response.json();
          } catch (error) {
            console.error('Error en mensajeService:', error);
            throw error;
          }
        },
    }