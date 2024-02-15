import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { EventCardComponent } from '../../../components/event-card/event-card.component';
import { EventDTO } from '../../../models/dto/EventDTO';
import { EventService } from '../../../services/event.service';



@Component({
  selector: 'app-event-validation',
  standalone: true,
  providers: [EventService],
  templateUrl: './event-validation.component.html',
  styleUrl: './event-validation.component.scss',
  imports: [HeaderComponent, FooterComponent, EventCardComponent]
})
export class EventValidationComponent implements OnInit {
  
  constructor(private eventService: EventService) { }

  events: EventDTO[] = [];

  handleChange(e: any) {
    const searchStatus = e.target.value;
    switch (searchStatus) {
      case 'crear':
        this.eventService.getEventsByState("revision").subscribe(
          (data) => {
            this.events = data.content;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        );
        break;
      case 'eliminar':
        this.eventService.getEventsByState("en-eliminacion").subscribe(
          (data) => {
            this.events = data.content;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        );
        break;
    }
  }
  
  ngOnInit(): void {
    this.eventService.getEventsByState("revision").subscribe(
      (data) => {
        this.events = data.content;
      },
      (error) => {
        console.error('Error fetching events por aprobar:', error);
      }
    );
  }
}
