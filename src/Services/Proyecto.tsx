import { API_CONFIG } from "../config/env";


export interface Proyecto {
    id?: number;
    imagenUrl: string;  
    titulo: string;
    descripcion: string;
}

export const proyectoService = {

async crearProyecto (proyecto: Proyecto) {
    
    try{
        const responde = await fetch(`${API_CONFIG.BASE_URL}/proyectos`,
            {
               method: 'POST',
               headers: {
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
}


}