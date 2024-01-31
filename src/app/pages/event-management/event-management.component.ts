import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { exampleEvents } from '../../data/exampleEventList';
import { Event } from "../../models/Event";

@Component({
  selector: 'app-event-management',
  standalone: true,
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.scss',
  imports: [FooterComponent, HeaderComponent, EventCardComponent]
})
export class EventManagementComponent {
  events: Event[] = exampleEvents;
}
