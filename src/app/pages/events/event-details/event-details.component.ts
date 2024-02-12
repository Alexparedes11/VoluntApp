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
  isCreator: boolean = false;

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
  deleteEvent() {
    // Crea un contenedor div para personalizar el estilo del alert
    const alertContainer = document.createElement("div");
    alertContainer.style.position = "fixed";
    alertContainer.style.top = "50%";
    alertContainer.style.left = "50%";
    alertContainer.style.transform = "translate(-50%, -50%)";
    alertContainer.style.backgroundColor = "#966DAF";
    alertContainer.style.padding = "15px";
    alertContainer.style.border = "1px solid #966DAF";
    alertContainer.style.borderRadius = "5px";
    alertContainer.style.textAlign = "center";
  
    // Crea un título
    const title = document.createElement("h3");
    title.textContent = "¿Estás seguro de solicitar la eliminación?";
    title.style.marginBottom = "15px";
    alertContainer.appendChild(title);
  
    // Crea un área de texto para que el usuario ingrese los motivos
    const motivosInput = document.createElement("textarea");
    motivosInput.placeholder = "Ingrese los motivos aquí...";
    motivosInput.style.width = "100%";
    motivosInput.style.height = "100px";
    motivosInput.style.marginBottom = "10px";
    alertContainer.appendChild(motivosInput);
  
    // Crea un botón de confirmación
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirmar";
    confirmButton.style.backgroundColor = "#890101";
    confirmButton.style.color = "#fff";
    confirmButton.style.padding = "8px 15px";
    confirmButton.style.border = "none";
    confirmButton.style.borderRadius = "3px";
    confirmButton.style.cursor = "pointer";
    confirmButton.style.marginRight = "10px";
    confirmButton.addEventListener("click", () => {
      // Guarda los motivos en la variable
      const motivosEliminacion = motivosInput.value;

  // Aquí puedes hacer lo que necesites con la variable
  console.log(motivosEliminacion);

  // Actualizar el estado a "revision"
  this.eventService.updateEventState(this.eventId, "revision").subscribe(
    () => {
      // Cierra el alert después de que la actualización sea exitosa
      document.body.removeChild(alertContainer);
    },
    (error) => {
      console.error('Error al actualizar el estado del evento:', error);

      // Manejar el error aquí si es necesario

      // Cierra el alert incluso si hay un error
      document.body.removeChild(alertContainer);
    }
  );
});
    alertContainer.appendChild(confirmButton);
  
    // Crea un botón de cancelar
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.style.backgroundColor = "#386641"; // Cambiado a #386641
    cancelButton.style.color = "#fff"; // Cambiado a #fff
    cancelButton.style.padding = "8px 15px";
    cancelButton.style.border = "none";
    cancelButton.style.borderRadius = "3px";
    cancelButton.style.cursor = "pointer";
    cancelButton.addEventListener("click", () => {
      // Cierra el alert sin hacer nada
      document.body.removeChild(alertContainer);
    });
    alertContainer.appendChild(cancelButton);
  
    // Agrega el contenedor al cuerpo del documento
    document.body.appendChild(alertContainer);
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

        this.eventService.isUserCreator(this.userId, this.eventId).subscribe(
          (boolean) => {
            if (boolean == true){
                this.isCreator = true;
            }
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        )
          
      }
    }
  }
}
