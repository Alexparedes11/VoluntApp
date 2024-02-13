import { User } from "./User";
import { Location } from "./Location";

export interface Event {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: Location;
    maxVoluntarios: number;
    estado: string;
    imagen: string;
    creadoPorUsuarios: User;
    creadoPorInstituciones: any; // Podría ser un tipo específico si tienes un modelo para instituciones
    ffin: string;
    finicio: string;
  }