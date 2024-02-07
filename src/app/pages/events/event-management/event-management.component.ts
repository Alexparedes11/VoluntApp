
import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { EventCardComponent } from '../../../components/event-card/event-card.component';
import { EventDTO } from '../../../models/dto/EventDTO';

@Component({
  selector: 'app-event-management',
  standalone: true,
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.scss',
  imports: [FooterComponent, HeaderComponent, EventCardComponent]
})
export class EventManagementComponent {
  events: EventDTO[] = [];
}
