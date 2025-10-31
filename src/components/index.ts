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

export interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
   usuario?: (usuario: string) => void;
}

export interface Casa {
    id: string;
    nombre: string;
    imagenUrl: string;
    precio: number;
    ubicacion: string;
    habitaciones: number;
    banos: number;
    metrosCuadrados: number;
    descripcion: string;
}




