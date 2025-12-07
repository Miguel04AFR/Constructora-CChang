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


export interface PaginacionResponse {
    casas: Casa[];
    total: number;
    totalPages: number;
}


export const casaService = {
    async crearCasaConImagen(formData: FormData) {
        try {
           
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas/upload`, {
                method: 'POST',
                headers: {


                },
                body: formData,
                credentials: 'include',
                
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
          
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas`, {
                method: 'POST',
                headers: {
            
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
                credentials: 'include',
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


     // Casa.tsx - modifica obtenerCasasPag
async obtenerCasasPag(paginacion: {limit: number, offset: number}): Promise<PaginacionResponse> {
    try {
        // Asegúrate de que los parámetros sean números
        const limit = paginacion.limit || 10;
        const offset = paginacion.offset || 0;
        
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/casas/pag?limit=${limit}&offset=${offset}`, 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('Response status paginación:', response.status);
        
        if (!response.ok) {
            // Obtener detalles del error
            let errorMessage = 'Error al obtener casas paginadas';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
                console.error('Error detallado:', errorData);
            } catch {
                errorMessage = `Error ${response.status}: ${response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error('Error obteniendo casas:', error);
        throw error;
    }
},


    async eliminarCasa(id: number) {
        try {
          
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
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

          
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casas/${id}`, {
                  method: 'PATCH',
                   headers: {
                  'Content-Type': 'application/json',
                },
                  body: JSON.stringify(updateData),
                  credentials: 'include',
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