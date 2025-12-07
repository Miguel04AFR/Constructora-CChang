import { authService } from "../auth/auth";

export interface Remodelacion {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    descripcionDetallada?: string;
    imagenUrl?: string;
    accesorios: string[];
}

export interface PaginacionRemodelacion {
    remodelaciones: Remodelacion[];
    total: number;
    totalPages: number;
}

export const remodelacionService = {
    async crearRemodelacionConImagen(formData: FormData) {
        try {


            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remodelaciones/upload`, {
                method: 'POST',
                headers: {

                },
                body: formData,
                credentials: 'include',
            });

            console.log('Response status remodelación con imagen:', response.status);
            
            if (!response.ok) {
                // Obtener detalles del error
                let errorMessage = 'Error al crear remodelación con imagen';
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
            console.error('Error creando remodelación con imagen:', error);
            throw error;
        }
    },

    async crearRemodelacion(remodelacion: Omit<Remodelacion, 'id'>) {
        try {


            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remodelaciones`, {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(remodelacion),
                credentials: 'include',
            });

            console.log('Response status crear remodelación:', response.status);
            
            if (!response.ok) {
                // Obtener detalles del error
                let errorMessage = 'Error al crear remodelación';
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
            console.error('Error en remodelacionService:', error);
            throw error;
        }
    },

    async obtenerRemodelaciones() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remodelaciones`);
            
            console.log('Response status obtener todas:', response.status);
            
            if (!response.ok) {
                // Obtener detalles del error
                let errorMessage = 'Error al obtener remodelaciones';
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
            console.error('Error obteniendo remodelaciones:', error);
            throw error;
        }
    },

     async obtenerRemodelacionesPag(paginacion: {limit: number, offset: number}): Promise<PaginacionRemodelacion> {
        try {
            const limit = paginacion.limit || 3;
            const offset = paginacion.offset || 0;
            
            console.log('Solicitando remodelaciones paginadas:', { limit, offset });
            
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/remodelaciones/pag?limit=${limit}&offset=${offset}`, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log('Response status paginación remodelaciones:', response.status);
            
            if (!response.ok) {
                // Obtener detalles del error
                let errorMessage = 'Error al obtener remodelaciones paginadas';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                    console.error('Error detallado remodelaciones:', errorData);
                } catch {
                    errorMessage = `Error ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('Datos recibidos remodelaciones:', {
                total: data.total,
                totalPages: data.totalPages,
                remodelacionesRecibidas: data.remodelaciones ? data.remodelaciones.length : 0
            });
            
            return data;
        } catch (error) {
            console.error('Error obteniendo remodelaciones paginadas:', error);
            throw error;
        }
    },

    async eliminarRemodelacion(id: number) {
        try {


            console.log('Eliminando remodelación ID:', id);
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remodelaciones/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            console.log('Response status eliminar remodelación:', response.status);
            
            if (!response.ok) {
                // Obtener detalles del error
                let errorMessage = 'Error al eliminar remodelación';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                    console.error('Error detallado eliminar:', errorData);
                } catch {
                    errorMessage = `Error ${response.status}: ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }

            if (response.status === 204) {
                return { success: true, message: 'Remodelación eliminada correctamente' };
            }

            return await response.json();
        } catch (error) {
            console.error('Error en remodelacionService eliminando:', error);
            throw error;
        }
    },

    async updateRemodelacion(id: number, updateData: Partial<Remodelacion>) {
        try {


          console.log('Actualizando remodelación ID:', id, 'Datos:', updateData);
    
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remodelaciones/${id}`, {
            method: 'PATCH',
             headers: {

            'Content-Type': 'application/json',
          },
            body: JSON.stringify(updateData),
            credentials: 'include',
          });

          console.log('Response status actualizar remodelación:', response.status);
    
          if (!response.ok) {
            // Obtener detalles del error
            let errorMessage = 'Error al actualizar remodelación';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
                console.error('Error detallado actualizar:', errorData);
            } catch {
                errorMessage = `Error ${response.status}: ${response.statusText}`;
            }
            throw new Error(errorMessage);
          }
    
          const data = await response.json();
          console.log('Remodelación actualizada exitosamente:', data);
          
          return data;
        } catch (error) {
          console.error('Error en remodelacionService actualizando:', error);
          throw error;
        }
      },
};

export default Remodelacion;