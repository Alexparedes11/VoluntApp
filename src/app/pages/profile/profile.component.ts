import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDTO } from '../../models/dto/UserDTO';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common'; // Importar NgIf y NgClass por separado
import { EventService } from '../../services/event.service';
import { EventDTO } from '../../models/dto/EventDTO';
import { NumeroDeEventosDTO } from '../../models/dto/NumeroDeEventosDTO';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [UserService, EventService],
  imports: [HeaderComponent, FooterComponent, HttpClientModule, ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] // Corregir styleUrl a styleUrls
})
export class ProfileComponent implements OnInit {

  selectedProfileImage: string | null = null;
  selectedBannerImage: string | null = null;
  userId: number = -1;
  tipo: string = "";
  editarperfil: boolean = false;
  user: UserDTO = {} as UserDTO;
  event: EventDTO[] = [];
  profileForm!: FormGroup;
  editedUser: UserDTO | null = null;
  eventosPerfil: NumeroDeEventosDTO = {} as NumeroDeEventosDTO;

  constructor(private fb: FormBuilder, private userService: UserService, private eventoService: EventService) { }

  ngOnInit(): void {

    this.tipo = this.userService.getUserTypeFromToken();
    console.log(this.tipo);

    if (this.tipo == "Usuario") {

      this.userId = this.userService.getUserIdFromToken();

      this.eventoService.obtenerEventosPerfil(this.userId).subscribe(
        (data) => {
          console.log(data);
          this.eventosPerfil = data;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );

      this.userService.getUserById(this.userId).subscribe( // Cambiar profileService a userService
        (data) => {
          console.log(data);
          this.user = data;
        },
        (error) => {
          console.error('Error fetching user data:', error); // Cambiar 'Error fetching events:' a 'Error fetching user data:'
        }
      );

      this.eventoService.getEventsCreatedByUser(this.userId).subscribe(
        (data) => {
          console.log(data);
          this.event = data;
          this.initializeForm();
          console.log("Este es el formulario " + this.profileForm.value);
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }
  }

  // Mover la función initializeForm fuera de ngOnInit
  initializeForm(): void {
    this.profileForm = this.fb.group({
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      dni: new FormControl(this.user.dni),
      telefono: new FormControl(''),
      direccion: new FormControl(''),
      email: new FormControl(''),
      fotoBanner: new FormControl(''),
      fotoPerfil: new FormControl(''),
      eventosNombre: new FormControl(this.user.eventosNombre),
    });
  }

  mostrarContenedor() {
    this.editarperfil = !this.editarperfil;
  }

  onProfileImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedProfileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onBannerImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedBannerImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitEditar(): void {
    this.editedUser = this.user;

    if (this.editedUser) {
      // Obtienes los valores actuales del formulario
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

      this.editedUser.fotoPerfil = this.selectedProfileImage;
      this.editedUser.fotoBanner = this.selectedBannerImage;

      this.userService.edit(this.userId, this.editedUser).subscribe(
        () => {
          window.location.reload();
        },
        (error: any) => {
          this.profileForm.get('email')?.setErrors({ emailInUse: true });
        }
      );
    }
  }
}
