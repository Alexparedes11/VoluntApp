import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EventService } from '../../services/event.service';
import { HttpClientModule } from '@angular/common/http';
import { EventDTO } from '../../models/dto/EventDTO';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-event',
  standalone: true,
  providers: [EventService, UserService],
  imports: [HeaderComponent, FooterComponent, HeaderComponent, FooterComponent, HttpClientModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {

  constructor(private eventService: EventService, private userService: UserService) { }

  @Input("id") eventId: number = -1;
  userId: number = -1;
  isUserInEvent: boolean = false;

  event: EventDTO = {} as EventDTO;

  addUserToEvent() {

  }

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromToken();

    this.eventService.getEventById(this.eventId).subscribe(
      (data) => {
        this.event = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    this.eventService.isUserInEvent(this.userId, this.eventId).subscribe(
      (data) => {
        this.isUserInEvent = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}
