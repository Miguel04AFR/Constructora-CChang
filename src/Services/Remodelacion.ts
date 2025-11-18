export interface Item {
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
    descripcion?: string;
    imagenUrl?: string;
}

export interface Remodelacion {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
    descripcionDetallada?: string;
    imagenUrl?: string;
    items: Item[];
}

export default Remodelacion;
