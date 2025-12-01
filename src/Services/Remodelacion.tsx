import { authService } from "../auth/auth";
import { API_CONFIG } from "../config/env";

export interface Remodelacion {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    descripcionDetallada?: string;
    imagenUrl?: string;
    accesorios: string[];
}

export const remodelacionService = {
    async crearRemodelacionConImagen(formData: FormData) {
        try {
            const token = authService.getToken();

            if (!token) {
                throw new Error('Usuario no autenticado. Debe iniciar sesión primero.');
            }

            const response = await fetch(`${API_CONFIG.BASE_URL}/remodelaciones/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear remodelación');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creando remodelación con imagen:', error);
            throw error;
        }
    },

    async crearRemodelacion(remodelacion: Omit<Remodelacion, 'id'>) {
        try {
            const token = authService.getToken();

            if (!token) {
                throw new Error('Usuario no autenticado. Debe iniciar sesión primero.');
            }

            const response = await fetch(`${API_CONFIG.BASE_URL}/remodelaciones`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(remodelacion),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear remodelación');
            }

            return await response.json();
        } catch (error) {
            console.error('Error en remodelacionService:', error);
            throw error;
        }
    },

    async obtenerRemodelaciones() {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/remodelaciones`);
            return await response.json();
        } catch (error) {
            console.error('Error obteniendo remodelaciones:', error);
            throw error;
        }
    },

    async eliminarRemodelacion(id: number) {
        try {
            const token = authService.getToken();

            if (!token) {
                throw new Error('No estás autenticado');
            }

            const response = await fetch(`${API_CONFIG.BASE_URL}/remodelaciones/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al eliminar remodelación');
            }

            if (response.status === 204) {
                return { success: true, message: 'Remodelación eliminada correctamente' };
            }

            return await response.json();
        } catch (error) {
            console.error('Error en remodelacionService:', error);
            throw error;
        }
    },

    async updateRemodelacion(id: number, updateData: Partial<Remodelacion>) {
        try {
          const token = authService.getToken();
    
          const response = await fetch(`${API_CONFIG.BASE_URL}/remodelacion/${id}`, {
            method: 'PATCH',
             headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
            body: JSON.stringify(updateData),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar remodelacion');
          }
    
          return await response.json();
        } catch (error) {
          console.error('Error en remodelacionService:', error);
          throw error;
        }
        
    
      },
};

export default Remodelacion;
