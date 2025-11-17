export interface Usuario {
  id?: string; // Opcional porque se genera al crear
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string; 
  fechaNacimiento: Date; 
}