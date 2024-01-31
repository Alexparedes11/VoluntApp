import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { Event } from '../models/Event';
import { User } from '../models/User';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HeaderComponent, FooterComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  @Input("id") eventId: Number | null = null;

  // Usuario de ejemplo
  userExample: User = {
    id: 1,
    name: "Pedro",
    surname: "Martínez",
    dni: "48776243X",
    address: "Calle de la piruleta, 69",
    email: "paco@gmail.com",
    password: "paco",
    profileImage: "/assets/images/bosque.jpg",
    rol: "user"
  };

  // Aquí se obtendría el evento a partir de la id
  event: Event = {
    id: 1,
    image: '/assets/images/mayores.jpg',
    title: 'Informatica para mayores',
    startDate: new Date(),
    endDate: new Date(),
    location: 'Alicante',
    volunteers: 15,
    createdBy: this.userExample
  }
}
