import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [EventService],
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private eventService: EventService, private location: Location) { }

  back() {
    this.location.back();
  }

  form = new FormGroup({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    dni: new FormControl(''),
    telefono: new FormControl(''),
    direccion: new FormControl(''),
    email: new FormControl(''),
    contraseña: new FormControl(''),
  });

  institucion: boolean = false;
  pagina: 1 | 2 | 3 = 1;

  siguientePagina() {
    this.pagina++;
  }

  anteriorPagina() {
    this.pagina--;
  }

  primeraPagina() {
    this.pagina = 1;
  }

  segundaPagina() {
    this.pagina = 2;
  }

  terceraPagina() {
    this.pagina = 3;
  }

  cambiarform(opcion: string) {
    this.institucion = true;

    if (opcion === 'institucion') {
      this.institucion = true;
    } else {
      this.institucion = false;
    }
  }

  crearUsuario() {
    this.eventService.createUser(this.form.value).subscribe();
  }
}
