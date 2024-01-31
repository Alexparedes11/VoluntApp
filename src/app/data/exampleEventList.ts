import { Event } from "../models/Event";
import { Maria, Paco, Pedro } from "./exampleUsers";

export const exampleEvents: Event[] = [
    {
        id: 1,
        image: '/assets/images/mayores.jpg',
        title: 'Informática para mayores',
        startDate: new Date(),
        endDate: new Date(),
        location: 'Alicante',
        volunteers: 15,
        maxVolunteers: 300,
        volunteersList: [Paco, Maria],
        createdBy: Pedro
    },
    {
        id: 2,
        image: '/assets/images/pellets.jpg',
        title: 'Limpiar pellets',
        startDate: new Date(),
        endDate: new Date(),
        location: 'Playa San Juan',
        volunteers: 50,
        maxVolunteers: 300,
        volunteersList: [Paco, Maria],
        createdBy: Pedro
    },
    {
        id: 3,
        image: '/assets/images/limpiarbosque.jpg',
        title: 'Limpiar bosque',
        startDate: new Date(),
        endDate: new Date(),
        location: 'La font roja',
        volunteers: 5,
        maxVolunteers: 300,
        volunteersList: [Paco, Maria],
        createdBy: Pedro
    },
    {
        id: 4,
        image: '/assets/images/recogidaalimentos.jpg',
        title: 'Recogida de alimentos',
        startDate: new Date(),
        endDate: new Date(),
        location: 'Alicante',
        volunteers: 500,
        maxVolunteers: 300,
        volunteersList: [Paco, Maria],
        createdBy: Pedro
    },
    {
        id: 5,
        image: '/assets/images/inundacion.jpg',
        title: 'Limpieza de inundación',
        startDate: new Date(),
        endDate: new Date(),
        location: 'Alfaz del pi',
        volunteers: 100,
        maxVolunteers: 300,
        volunteersList: [Paco, Maria],
        createdBy: Pedro
    },
    {
        id: 6,
        image: '/assets/images/sonrisas.jpg',
        title: 'Sonrisas para los nenes',
        startDate: new Date(),
        endDate: new Date(),
        location: 'Hospital de Alicante',
        volunteers: 25,
        maxVolunteers: 300,
        volunteersList: [Paco, Maria],
        createdBy: Pedro
    }
];