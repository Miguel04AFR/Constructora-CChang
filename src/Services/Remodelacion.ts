export interface Remodelacion {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    descripcionDetallada?: string;
    imagenUrl?: string;
    // items are an array of strings with the format:
    // "Name : Description" (note the colon separator)
    items: string[];
}

export default Remodelacion;
