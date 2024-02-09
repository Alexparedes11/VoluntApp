import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { EventService } from '../../../services/event.service';
import { EventDTO } from '../../../models/dto/EventDTO';
import { UserService } from '../../../services/user.service';
import { DatePipe } from '@angular/common';
import { MapComponent } from '../../../components/map/map.component';

@Component({
  selector: 'app-event-details',
  standalone: true,
  providers: [EventService, UserService],
  imports: [HeaderComponent, FooterComponent, HeaderComponent, FooterComponent, DatePipe, MapComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {

  constructor(private eventService: EventService, private userService: UserService) { }

  @Input("id") eventId: number = -1;
  userId: number = -1;
  isUserInEvent: boolean = false;
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isUserCreator: boolean = false;

  event: EventDTO = {} as EventDTO;

  addUserToEvent() {
    this.eventService.addUserToEvent(this.userId, this.eventId).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isUserInEvent = true;
  }

  removeUserFromEvent() {
    this.eventService.removeUserFromEvent(this.userId, this.eventId).subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.isUserInEvent = false;
  }


  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
    this.userId = this.userService.getUserIdFromToken();

    this.eventService.getEventById(this.eventId).subscribe(
      (data) => {
        this.event = data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    this.isLogged = this.userService.isLogged();
    if (this.isLogged) {
    
      if (!this.isAdmin) {
      
        this.eventService.isUserInEvent(this.userId, this.eventId).subscribe(
          (data) => {
            this.isUserInEvent = data;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        
        );
        
        if (this.userId.toString() == this.event.creadoPorUsuario) {
          this.isUserCreator = true;
        } 
        
        
         

          
      }
    }
  }
}
