import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { EventDTO } from '../../../models/dto/EventDTO';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [ HeaderComponent, FooterComponent, ReactiveFormsModule ],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss'
})
export class EventCreateComponent {

  evento: EventDTO = {} as EventDTO;

  form = new FormGroup({
    titulo: new FormControl(''),
    descripcion: new FormControl(''),
    fincio: new FormControl(''),
    ffin: new FormControl(''),
    maxVoluntario: new FormControl(''),
    estado: new FormControl(''),
    imagen: new FormControl(''),
    creadoPorUsuario: new FormControl(''),
    ubicacion: new FormControl(''),
  });

  addEvent() {

    

  }


}
