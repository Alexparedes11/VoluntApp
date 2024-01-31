import { Component } from '@angular/core';
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
import { User } from '../models/User';
import { Event } from '../models/Event';
import { EventCardComponent } from '../components/event-card/event-card.component';

@Component({
    selector: 'app-event-managment',
    standalone: true,
    templateUrl: './event-managment.component.html',
    styleUrl: './event-managment.component.scss',
    imports: [FooterComponent, HeaderComponent, EventCardComponent]
})
export class EventManagmentComponent {


    userExample: User = {
        id: 2,
        name: "Pedro",
        surname: "Martínez",
        dni: "48776243X",
        address: "Calle de la piruleta, 69",
        email: "paco@gmail.com",
        password: "paco",
        profileImage: "/assets/images/bosque.jpg",
        rol: "user"
      };
    
      events: Event[] = [
        {
          id: 1,
          image: '/assets/images/mayores.jpg',
          title: 'Informatica para mayores',
          startDate: new Date(),
          endDate: new Date(),
          location: 'Alicante',
          volunteers: 15,
          createdBy: this.userExample
        },
        {
          id: 2,
          image: '/assets/images/pellets.jpg',
          title: 'Limpiar pellets',
          startDate: new Date(),
          endDate: new Date(),
          location: 'Playa San Juan',
          volunteers: 50,
          createdBy: this.userExample
        },
        {
          id: 3,
          image: '/assets/images/limpiarbosque.jpg',
          title: 'Limpiar bosque',
          startDate: new Date(),
          endDate: new Date(),
          location: 'La font roja',
          volunteers: 5,
          createdBy: this.userExample
        },
        {
          id: 4,
          image: '/assets/images/recogidaalimentos.jpg',
          title: 'Recogida de alimentos',
          startDate: new Date(),
          endDate: new Date(),
          location: 'Alicante',
          volunteers: 500,
          createdBy: this.userExample
        },
        {
          id: 5,
          image: '/assets/images/inundacion.jpg',
          title: 'Limpieza de inundacion',
          startDate: new Date(),
          endDate: new Date(),
          location: 'Alfaz del pi',
          volunteers: 100,
          createdBy: this.userExample
        },
        {
          id: 6,
          image: '/assets/images/sonrisas.jpg',
          title: 'Sonrisas para los nenes',
          startDate: new Date(),
          endDate: new Date(),
          location: 'Hospital de Alicante',
          volunteers: 25,
          createdBy: this.userExample
        }
      ];
    }
