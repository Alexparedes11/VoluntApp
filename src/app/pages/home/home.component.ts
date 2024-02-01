import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { FiltersBarComponent } from '../../components/filters-bar/filters-bar.component';
import { exampleEvents } from '../../data/exampleEventList';
import { Event } from "../../models/Event";
import { Maria, Paco, Pedro } from '../../data/exampleUsers';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, EventCardComponent, FiltersBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  events: Event[] = exampleEvents;
}
