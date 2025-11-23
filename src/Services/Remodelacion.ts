export interface Remodelacion {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    descripcionDetallada?: string;
    imagenUrl?: string;
    // items are now an array of strings with the format:
    // "Name; Description; Image path."
    items: string[];
}

export default Remodelacion;
