import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventService } from '../../services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { EventDTO } from '../../models/dto/EventDTO';

@Component({
  selector: 'app-validations',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, EventCardComponent, HttpClientModule],
  templateUrl: './validations.component.html',
  styleUrl: './validations.component.scss'
})
export class ValidationsComponent implements OnInit {
  
  constructor(private eventService: EventService) { }
  events: EventDTO[] = [];

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data.content;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}
