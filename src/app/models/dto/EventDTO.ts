import { Location } from "../Location";

export interface EventDTO {
    id: number;
    titulo: string;
    creadoPorInstitucion: string;
    creadoPorUsuario: string;
    descripcion: string;
    finicio: Date;
    ffin: Date;
    imagen: string;
    estado: string;
    maxVoluntarios: number;
    numVoluntarios: number;
    ubicacion: Location;
    nombreInstituciones: Array<string>;
    tags: Array<string>;
}