import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDTO } from '../../models/dto/UserDTO';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { EventService } from '../../services/event.service';
import { EventDTO } from '../../models/dto/EventDTO';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [ProfileService, UserService, EventService ],
  imports: [HeaderComponent, FooterComponent, HttpClientModule, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  userId: number = -1;

  editarperfil: boolean = false;

  mostrarContenedor() {
    this.editarperfil = !this.editarperfil;
  }

    constructor(private fb: FormBuilder, private profileService: ProfileService, private userService: UserService, private eventoService: EventService) { }

    user: UserDTO = {} as UserDTO;
    event: EventDTO[] = [];
    profileForm!: FormGroup;
    editedUser: UserDTO | null = null;
  
    ngOnInit(): void {

      this.userId = this.userService.getUserIdFromToken();

      this.profileService.getData(this.userId).subscribe(
        (data) => {
          console.log(data);
          this.user = data;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );

      this.eventoService.getEventsCreatedByUser(this.userId).subscribe(
        (data) => {
          console.log(data);
          this.event = data;
          this.initializeForm();
          console.log("Este es el formulario " + this.profileForm.value)
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }

  // Inicializamos el formulario
  initializeForm(): void {
    this.profileForm = this.fb.group({
      nombre: new FormControl('' , Validators.required),
      apellidos: new FormControl('', Validators.required),
      dni: new FormControl(this.user.dni),
      telefono: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      contraseña: new FormControl(this.user.contraseña),
      eventosNombre: new FormControl(this.user.eventosNombre),
    });
  }

  submitEditar(): void {
    if(this.editedUser) {
      // Obtienes los valores actuales del fomulario
      const editedNombre = this.profileForm.get('nombre')?.value ?? '';
      const editedApellidos = this.profileForm.get('apellidos')?.value ?? '';
      const editedTelefono = this.profileForm.get('telefono')?.value ?? '';
      const editedDireccion = this.profileForm.get('direccion')?.value ?? '';
      const editedEmail = this.profileForm.get('email')?.value ?? '';

      if (editedNombre.trim() !== '') {
        this.editedUser.nombre = editedNombre;
      }
      if (editedApellidos.trim() !== '') {
        this.editedUser.apellidos = editedApellidos;
      }
      if (editedTelefono.trim() !== '') {
        this.editedUser.telefono = editedTelefono;
      }
      if (editedDireccion.trim() !== '') {
        this.editedUser.direccion = editedDireccion;
      }
      if (editedEmail.trim() !== '') {
        this.editedUser.email = editedEmail;
      }

      console.log(this.editedUser);

      this.userService.edit(this.userId, this.editedUser).subscribe(
        () => {
          console.log('Usuario editado con éxito');
          this.editedUser = null;
          this.profileForm.reset();
        },
        (error: any) => {
          console.error('Error al editar noticia:', error);
        }
      )
    }
    
  }
}
