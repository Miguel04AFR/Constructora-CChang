import { authService } from "../auth/auth";
import { API_CONFIG } from "../config/env";


export interface Proyecto {
    id?: number;
    imagenUrl: string;  
    titulo: string;
    descripcion: string;
}

export const proyectoService = {


 async crearProyectoConImagen(formData: FormData) {
        try {

             const token = authService.getToken();
      
      if (!token) {
        throw new Error('No estás autenticado');
      }
            const response = await fetch(`${API_CONFIG.BASE_URL}/proyectos/upload`, {
                method: 'POST',
                   headers: {
                 'Authorization': `Bearer ${token}`,
               },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear proyecto');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creando proyecto con imagen:', error);
            throw error;
        }
    },

async crearProyecto (proyecto: Proyecto) {
    
    try{

         const token = authService.getToken();
      
      if (!token) {
        throw new Error('No estás autenticado');
      }

      
        const responde = await fetch(`${API_CONFIG.BASE_URL}/proyectos`,
            {
               method: 'POST',
               headers: {
                 'Authorization': `Bearer ${token}`,
                 'Content-Type': 'application/json',
               },
                body: JSON.stringify({
                    imagenUrl: proyecto.imagenUrl,
                    titulo: proyecto.titulo,
                    descripcion: proyecto.descripcion
                }),
            });
            if (!responde.ok) {
        const errorData = await responde.json();
        throw new Error(errorData.message || 'Error al crear usuario');
      }

      return await responde.json();
    }
    catch(error){
        console.log('El error es', error);
        throw error
    }

},


async obtenerProyectos () {

    try{
        const responde = await fetch(`${API_CONFIG.BASE_URL}/proyectos`)
        return await responde.json();
    }
    catch(error){
        console.error('el error es', error);
        throw error
    }
},

async eliminarProyecto(id: number) {
    try {

       const token = authService.getToken();
      
      if (!token) {
        throw new Error('No estás autenticado');
      }
      const response = await fetch(`${API_CONFIG.BASE_URL}/proyectos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar proyecto');
      }

       if (response.status === 204) {
      return { success: true, message: 'Proyecto eliminado correctamente' };
    }

      return await response.json();
    } catch (error) {
      console.error('Error en proyectoService:', error);
      throw error;
    }
  },


}