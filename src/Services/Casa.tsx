import { authService } from "../auth/auth";
import { API_CONFIG } from "../config/env";

export interface Casa {
    id?: string;
    nombre: string;
    imagenUrl: string;
    precio: number;
    ubicacion: string;
    habitaciones: number;
    banos: number;
    metrosCuadrados: number;
    descripcion: string;
}

 export const casaService = {
      async crearCasa(casa: Casa) {
        try {

          const token = authService.getToken(); 
          
          if (!token) {
      throw new Error('Usuario no autenticado. Debe iniciar sesión primero.');
    }

          const responde = await fetch(`${API_CONFIG.BASE_URL}/casas`, {
            method: 'POST',
            headers: {
              'Autehorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: casa.id,
                nombre: casa.nombre,
                precio: casa.precio,
                ubicacion: casa.ubicacion,
                habitaciones: casa.habitaciones,
                banos: casa.banos,
                metrosCuadrados: casa.metrosCuadrados,
                descripcion: casa.descripcion,
            }),
            });
          if (!responde.ok) {
            const errorData = await responde.json();
            throw new Error(errorData.message || 'Error al crear casa');
          }
    
          return await responde.json();
        } catch (error) {
          console.error('Error en casaService:', error);
          throw error;
        }
      },
    
    
      async obtenerCasas() {
        try {
          const response = await fetch(`${API_CONFIG.BASE_URL}/casas`);
          return await response.json();
        } catch (error) {
          console.error('Error obteniendo usuarios:', error);
          throw error;
        }
      },

      async eliminarCasa(id: number) {
                try {
            
                   const token = authService.getToken();
                  
                  if (!token) {
                    throw new Error('No estás autenticado');
                  }
                  const response = await fetch(`${API_CONFIG.BASE_URL}/casas/${id}`, {
                    method: 'DELETE',
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
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
                  console.error('Error en proyectoService:', error);
                  throw error;
                }
              },
    }
