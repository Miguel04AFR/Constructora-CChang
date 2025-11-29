import { API_CONFIG } from "../config/env";

export interface Casa {
    id?: string;
    nombre: string;
    imagenUrls: string[];
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
            const response = await fetch(`${API_CONFIG.BASE_URL}/casas/upload`, {
                method: 'POST',
                body: formData,
            });

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

      async crearUsuario(casa: Casa) {
        try {
          const responde = await fetch(`${API_CONFIG.BASE_URL}/users`, {
            method: 'POST',
            headers: {
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
            throw new Error(errorData.message || 'Error al crear usuario');
          }
    
          return await responde.json();
        } catch (error) {
          console.error('Error en usuarioService:', error);
          throw error;
        }
      },
    
    
      async obtenerCasas() {
        try {
          const response = await fetch(`${API_CONFIG.BASE_URL}/users`);
          return await response.json();
        } catch (error) {
          console.error('Error obteniendo usuarios:', error);
          throw error;
        }
      }
    }
