import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { EventService } from '../../../services/event.service';
import { MapboxService } from '../../../services/mapbox.service';
import { OllamaDescriptionService } from '../../../services/ollama.description.service';
import { OllamaODSService } from '../../../services/ollama.ods.service';
import { UserService } from '../../../services/user.service';
import { UserDTO } from '../../../models/dto/UserDTO';
import { InstitutionService } from '../../../services/institution.service';
import { Institution } from '../../../models/Institution';
import { Router } from '@angular/router';

interface AddressInfo {
  place_name: string;
  center: number[];
}

@Component({
  selector: 'app-event-create',
  standalone: true,
  providers: [EventService, UserService, InstitutionService, MapboxService, OllamaDescriptionService, OllamaODSService ],
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent {

  isLoading: boolean = false;
  isLoadingODS: boolean = false;
  userId: number = -1;
  user: UserDTO = {} as UserDTO;
  institution: Institution = {} as Institution;
  eventForm!: FormGroup;
  private inputFecha: HTMLInputElement | null;
  selectedImage: File | null = null;
  addresses: AddressInfo[] = [];
  selectedAddressName: string | null = null;
  selectedAddress: AddressInfo | null = null;
  tipo: string = "";
  createdSuccessfully: boolean | null = null;
  errorMessage: string = "";
  showAlert: boolean = false;

  constructor(private eventService: EventService, private userService: UserService, private mapboxService: MapboxService, private institutionService: InstitutionService, private router: Router, private ollamaDescriptionService: OllamaDescriptionService, private ollamaODSService: OllamaODSService) {
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

  ngOnInit(): void {
    this.initializeForm();
    this.userId = this.userService.getUserIdFromToken();
    this.tipo = this.userService.getUserTypeFromToken();

    if (this.tipo == "Usuario") {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.user = data;
          this.initializeForm();
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    } else if (this.tipo == "Institucion") {
      this.institutionService.getInstitucionById(this.userId).subscribe(
        (data) => {
          this.institution = data;
          this.initializeForm();
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }
  }

  initializeForm(): void {
      this.eventForm = new FormGroup({
      id: new FormControl(''),
      finicio: new FormControl('', Validators.required),
      ffin: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      nombreUbicacion: new FormControl('', Validators.required),
      ods: new FormControl('', Validators.required),
      lat: new FormControl(''),
      lon: new FormControl(''),
      imagen: new FormControl(null, Validators.required),
      estado: new FormControl(''),
      usuarioNombre: new FormControl(null),
      usuarioId: new FormControl(this.userId),
      institucionNombre: new FormControl(null),
      maxVoluntarios: new FormControl('', Validators.required),
    });

    if (this.tipo == "Usuario") {
      if (this.eventForm) {
        this.eventForm.get('usuarioNombre')?.setValue(this.user.nombre);
        this.eventForm.get('usuarioId')?.setValue(this.user.id);
      }
    } else if (this.tipo == "Institucion") {
      if (this.eventForm) {
        this.eventForm.get('institucionNombre')?.setValue(this.institution.nombre);
      }
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  goToMyEvents() {
    this.router.navigate(['/myevents']);
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

  camposVaciosODS(): boolean {
    const titulo = this.eventForm?.get('titulo')?.value;
    const descripcion = this.eventForm?.get('descripcion')?.value;
  
    return (typeof titulo === 'string' && titulo.trim() === '') || (typeof descripcion === 'string' && descripcion.trim() === '');
  }

  camposVaciosDescripcion(): boolean {
    const titulo = this.eventForm?.get('titulo')?.value;
    const ubicacion = this.eventForm?.get('nombreUbicacion')?.value;
    const finicio = this.eventForm?.get('finicio')?.value;
    const ffin = this.eventForm?.get('ffin')?.value;
    const maxVoluntarios = this.eventForm?.get('maxVoluntarios')?.value;
  
    return (typeof titulo === 'string' && titulo.trim() === '') || (typeof ubicacion === 'string' && ubicacion.trim() === '') || (typeof finicio === 'string' && finicio.trim() === '') || (typeof ffin === 'string' && ffin.trim() === '') || (typeof maxVoluntarios === 'string' && maxVoluntarios.trim() === '');
  }

  async generarDescripcion() {
    const titulo = this.eventForm.get('titulo')?.value;
    const ubicacion = this.eventForm.get('nombreUbicacion')?.value;
    const finicio = this.eventForm.get('finicio')?.value;
    const ffin = this.eventForm.get('ffin')?.value;
    const maxVoluntarios = this.eventForm.get('maxVoluntarios')?.value;
    this.isLoading = true;

    await this.ollamaDescriptionService.generateEventSummary(titulo, ubicacion ,finicio, ffin, maxVoluntarios).then((response) => {
      this.eventForm.patchValue({
        descripcion: response
      });
      this.isLoading = false;
      console.log(response);
    });
  }

  async generarODS() {
    const titulo = this.eventForm.get('titulo')?.value;
    const descripcion = this.eventForm.get('descripcion')?.value;
    this.isLoadingODS = true;

    await this.ollamaODSService.generateEventSummary(descripcion, titulo).then((response) => {
      this.eventForm.patchValue({
        ods: response
      });
      this.isLoadingODS = false;
      console.log(response);
    });
  }
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

  onSelect(address: AddressInfo) {
    this.selectedAddress = address;
    this.selectedAddressName = address.place_name;
    this.eventForm.patchValue({
      nombreUbicacion: address.place_name
    });
    const searchLocationInput = document.getElementById('searchLocationInput') as HTMLInputElement;
    if (searchLocationInput) {
      searchLocationInput.value = "";
    }
    this.addresses = [];
  }

  submitEvent() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      formValue.nombreUbicacion = this.selectedAddress?.place_name;
      formValue.lat = this.selectedAddress?.center[0];
      formValue.lon = this.selectedAddress?.center[1];
      formValue.imagen = this.selectedImage;

      this.eventService.createEvent(formValue).subscribe(
        (data: any) => {
          if (this.tipo === "Usuario") {
            this.eventService.addUserToEvent(this.userId, Number(data.id)).subscribe();
          } else if (this.tipo === "Institucion") {
            this.eventService.addInstitutionToEvent(this.userId, Number(data.id)).subscribe();
          }
          this.createdSuccessfully = true;
        },
        (error) => {
          this.createdSuccessfully = false;
          this.errorMessage = error.error;
        },
        () => {
          this.eventForm.reset();
          this.initializeForm();
          this.selectedImage = null;
          this.showAlert = true;
        }
      );
    }
  }
}
