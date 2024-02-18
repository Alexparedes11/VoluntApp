import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { InputLocationComponent } from '../../../components/input-location/input-location.component';
import { EventDTO } from '../../../models/dto/EventDTO';
import { EventService } from '../../../services/event.service';
import { MapboxService } from '../../../services/mapbox.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/UserDTO';

interface AdressInfo {
  place_name: string;
  center: number[];
}

@Component({
  selector: 'app-event-create',
  standalone: true,
  providers: [EventService, UserService, MapboxService],
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, InputLocationComponent, NgIf, NgClass],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss'
})
export class EventCreateComponent {

  // Parámetros inicializados
  userId: number = -1;
  user: UserDTO = {} as UserDTO;
  eventForm!: FormGroup;
  private inputFecha: HTMLInputElement | null;
  selectedImage: File | null = null;
  addresses: AdressInfo[] = [];
  selectedAddressName: string | null = null;
  selectedAddress: AdressInfo | null = null;


  // Constructor del formulario
  constructor(private fb: FormBuilder, private eventService: EventService, private userService: UserService, private mapboxService: MapboxService) {

    // Prevenir que se pueda escribir en el calendario
    this.inputFecha = document.getElementById('finicio') as HTMLInputElement;

    if (this.inputFecha) {
      this.inputFecha.addEventListener('keydown', (e: KeyboardEvent) => {
        e.preventDefault();
      });

      this.inputFecha.addEventListener('mousedown', (e: MouseEvent) => {
        e.preventDefault();
      });
    }


  }

  // Obtenemos el usuario
  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.userService.getUserIdFromToken();

    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.initializeForm();
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  // Inicializamos el formulario
  initializeForm(): void {
    this.eventForm = this.fb.group({
      id: [''],
      finicio: ['', Validators.required],
      ffin: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      nombreUbicacion: ['', Validators.required],
      lat: [''],
      lon: [''],
      imagen: [null, Validators.required],
      estado: [''],
      usuarioNombre: [this.user.nombre],
      usuarioId: [this.user.id],
      maxVoluntarios: ['', Validators.required],
    }, { validator: this.validarFechas });
  }

  obtenerFechaActual(): string {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDate();
    const horas = hoy.getHours();
    const minutos = hoy.getMinutes();
    const formatoMes = mes < 10 ? `0${mes}` : mes;
    const formatoDia = dia < 10 ? `0${dia}` : dia;
    const formatoHoras = horas < 10 ? `0${horas}` : horas;
    const formatoMinutos = minutos < 10 ? `0${minutos}` : minutos;
    return `${hoy.getFullYear()}-${formatoMes}-${formatoDia}T${formatoHoras}:${formatoMinutos}`;
  }

  validarFechas(group: FormGroup) {
    const finicio = group.get('finicio');
    const ffin = group.get('ffin');

    if (finicio && ffin && finicio.value && ffin.value) {
      const fechaInicio = new Date(finicio.value);
      const fechaFin = new Date(ffin.value);

      if (fechaFin < fechaInicio) {
        ffin.setErrors({ 'fechaInvalida': true });
      } else {
        ffin.setErrors(null);
      }
    }
  }

  // Mostrar la imagen en por pantalla
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Búsqueda de la dirección
  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService.searchWord(searchTerm).subscribe((features: any[]) => {
        this.addresses = features.map(feat => ({ place_name: feat.place_name, center: feat.center }));
      });
    } else {
      this.addresses = [];
    }
  }

  // Dirección seleccionada
  onSelect(address: AdressInfo) {
    this.selectedAddressName = address.place_name;
    this.selectedAddress = address;
    this.addresses = [];
  }

  // Subir el evento a la base de datos para revisarlo
  submitEvent() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      formValue.nombreUbicacion = this.selectedAddress?.place_name;
      formValue.lat = this.selectedAddress?.center[0];
      formValue.lon = this.selectedAddress?.center[1];
      formValue.imagen = this.selectedImage;

      alert('El siguiente evento pasará por un proceso de validación antes de ser publicado, se le notificará de este en caso de haber pasado la revisión.');
      this.eventService.createEvent(formValue).subscribe(
        (data: any) => {
          this.eventService.addUserToEvent(this.userId, Number(data.id)).subscribe();
        },
        (error) => {
          console.error('Error creating event:', error);
        }
      );
      this.eventForm.reset();
      this.initializeForm();
    }
  }
}
