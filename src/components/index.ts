export * from './MenuBar';

export interface Proyecto {
    id: number;
    imagenUrl: string;  
}

export interface Servicio {
    id: number;
    titulo?: string;
    descripcion?: string;
    iconoUrl: string;
}

export interface FormularioContacto {
    nombre: string;
    telefono: string;
    email: string;
    mensaje: string;
}

