import { Location } from "../Location";

export interface EventDTO {
    id: number;
    titulo: string;
    creadoPorInstitucion: null;
    creadoPorUsuario: string;
    descripcion: string;
    finicio: Date;
    ffin: Date;
    imagen: string;
    estado: string;
    maxVoluntarios: number;
    numVoluntarios: number;
    ubicacion: Location;
    nombreInstituciones: Array<string>; // Para no crear un modelo de instituciones
}