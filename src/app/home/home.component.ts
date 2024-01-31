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
      image: '/assets/images/bosque.jpg',
      title: 'Evento 1',
      startDate: new Date(),
      endDate: new Date(),
      location: 'São Paulo',
      volunteers: 5
    },
    {
      id: 2,
      image: '/assets/images/cascada.jpg',
      title: 'Evento 2',
      startDate: new Date(),
      endDate: new Date(),
      location: 'São Paulo',
      volunteers: 5
    },
    {
      id: 3,
      image: '/assets/images/montana.jpg',
      title: 'Evento 3',
      startDate: new Date(),
      endDate: new Date(),
      location: 'São Paulo',
      volunteers: 5
    },
    {
      id: 4,
      image: '/assets/images/rio.jpg',
      title: 'Evento 4',
      startDate: new Date(),
      endDate: new Date(),
      location: 'São Paulo',
      volunteers: 5
    },
    {
      id: 5,
      image: '/assets/images/bosque.jpg',
      title: 'Evento 5',
      startDate: new Date(),
      endDate: new Date(),
      location: 'São Paulo',
      volunteers: 5
    },
    {
      id: 6,
      image: '/assets/images/bannerprofile.jpg',
      title: 'Evento 6',
      startDate: new Date(),
      endDate: new Date(),
      location: 'São Paulo',
      volunteers: 5
    }
  ];
}
