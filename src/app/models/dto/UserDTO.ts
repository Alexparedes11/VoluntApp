export interface UserDTO {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    imagen: string;
    dni: string;
    direccion: string;
    contraseña: string;
    fotoBanner: string;
    fotoPerfil: string;
    eventosNombre: Array<String>;
}