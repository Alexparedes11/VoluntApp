import { User } from "./User";
import { Location } from "./Location";
import { Institution } from "./Institution";

export interface Event {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: Location;
    maxVoluntarios: number;
    estado: string;
    imagen: string;
    creadoPorUsuarios: User;
    creadoPorInstituciones: Institution;
    ffin: string;
    finicio: string;
  }