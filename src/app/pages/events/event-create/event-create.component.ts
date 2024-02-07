import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { EventDTO } from '../../../models/dto/EventDTO';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

@Component({
  selector: 'app-event-create',
  standalone: true,
  providers: [ EventService, UserService ],
  imports: [ HeaderComponent, FooterComponent, ReactiveFormsModule ],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss'
})
export class EventCreateComponent {

  constructor(private eventService: EventService, private userService: UserService) { }
  userId: number = -1;


  evento: EventDTO = {} as EventDTO;
  user: User = {} as User;

  form = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    finicio: new FormControl(''),
    ffin: new FormControl(''),
    maxVoluntarios: new FormControl(''),
    estado: new FormControl(''),
    imagen: new FormControl(''),
    creadoPorUsuarios: new FormControl(),
    ubicacion: new FormControl(''),
  });

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromToken();

    // this.user = this.userService.getUserById(this.userId);
  }
  addEvent() {  
    this.eventService.createEvent(this.form.value).subscribe();
  }


}
