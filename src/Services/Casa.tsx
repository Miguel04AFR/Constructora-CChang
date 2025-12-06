import { authService } from "../auth/auth";
import { API_CONFIG } from "../config/env";

export interface Casa {
    id?: string;
    nombre: string;
    imagenUrl: string[];
    precio: number;
    ubicacion: string;
    habitaciones: number;
    banos: number;
    metrosCuadrados: number;
    descripcion: string;
}

export const casaService = {
    async crearCasaConImagen(formData: FormData) {
        try {
            const token = authService.getToken(); 
            
            if (!token) {
                throw new Error('Usuario no autenticado. Debe iniciar sesión primero.');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,

                },
                body: formData,
                
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear casa');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creando casa con imagen:', error);
            throw error;
        }
    },

    async crearCasa(casa: Casa) {
        try {
            const token = authService.getToken(); 
            
            if (!token) {
                throw new Error('Usuario no autenticado. Debe iniciar sesión primero.');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear casa');
            }

            return await response.json();
        } catch (error) {
            console.error('Error en casaService:', error);
            throw error;
        }
    },

    async obtenerCasas() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas`);
            return await response.json();
        } catch (error) {
            console.error('Error obteniendo casas:', error);
            throw error;
        }
    },


     async obtenerCasasPag(paginacion: {limit: number, offset: number}) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas/pag`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                     body: JSON.stringify({
                       limit: paginacion.limit,
                       offset: paginacion.offset
                }),
                }
            });

            return await response.json();
        } catch (error) {
            console.error('Error obteniendo casas:', error);
            throw error;
        }
    },

    async eliminarCasa(id: number) {
        try {
            const token = authService.getToken();

            if (!token) {
                throw new Error('No estás autenticado');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar casa');
            }

            if (response.status === 204) {
                return { success: true, message: 'Casa eliminada correctamente' };
            }

            return await response.json();
        } catch (error) {
            console.error('Error en casaService:', error);
            throw error;
        }
    },


    async updateCasa(id: number, updateData: Partial<Casa>) {
              try {
                const token = authService.getToken();
          
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas/${id}`, {
                  method: 'PATCH',
                   headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                  body: JSON.stringify(updateData),
                });
          
                if (!response.ok) {
                  const errorData = await response.json();
                  throw new Error(errorData.message || 'Error al actualizar casa');
                }
          
                return await response.json();
              } catch (error) {
                console.error('Error en casaService:', error);
                throw error;
              }
              
          
            },
}