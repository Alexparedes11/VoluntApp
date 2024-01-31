import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { EventCardComponent } from '../components/event-card/event-card.component';
import { EventFiltersComponent } from '../components/event-filters/event-filters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,EventCardComponent,EventFiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  events = [
    {
      id: 1,
      image: '/assets/images/mayores.jpg',
      title: 'Informatica para mayores',
      startDate: new Date(),
      endDate: new Date(),
      location: 'Alicante',
      volunteers: 15
    },
    {
      id: 2,
      image: '/assets/images/pellets.jpg',
      title: 'Limpiar pellets',
      startDate: new Date(),
      endDate: new Date(),
      location: 'Playa San Juan',
      volunteers: 50
    },
    {
      id: 3,
      image: '/assets/images/limpiarbosque.jpg',
      title: 'Limpiar bosque',
      startDate: new Date(),
      endDate: new Date(),
      location: 'La font roja',
      volunteers: 5
    },
    {
      id: 4,
      image: '/assets/images/recogidaalimentos.jpg',
      title: 'Recogida de alimentos',
      startDate: new Date(),
      endDate: new Date(),
      location: 'Alicante',
      volunteers: 500
    },
    {
      id: 5,
      image: '/assets/images/inundacion.jpg',
      title: 'Limpieza de inundacion',
      startDate: new Date(),
      endDate: new Date(),
      location: 'Alfaz del pi',
      volunteers: 100
    },
    {
      id: 6,
      image: '/assets/images/sonrisas.jpg',
      title: 'Sonrisas para los nenes',
      startDate: new Date(),
      endDate: new Date(),
      location: 'Hospital de Alicante',
      volunteers: 25
    }
  ];
}
