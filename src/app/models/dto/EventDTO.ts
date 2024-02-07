export interface EventDTO {
    id: number;
    titulo: string;
    creadoPorInstitucion: null;
    creadoPorUsuario: string;
    descripcion: string;
    finicio: Date;
    ffin: Date;
    imagen: string;
    maxVoluntarios: number;
    numVoluntarios: number;
    ubicacion: {
        nombre: string;
        lat: number;
        lon: number;
    };
}