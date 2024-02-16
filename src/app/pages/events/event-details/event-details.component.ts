import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { EventService } from '../../../services/event.service';
import { EventDTO } from '../../../models/dto/EventDTO';
import { UserService } from '../../../services/user.service';
import { DatePipe } from '@angular/common';
import { MapComponent } from '../../../components/map/map.component';
import { UserDTO } from '../../../models/dto/UserDTO';
import { Router } from '@angular/router';
import { Event } from '../../../models/Event';

@Component({
  selector: 'app-event-details',
  standalone: true,
  providers: [EventService, UserService],
  imports: [HeaderComponent, FooterComponent, HeaderComponent, FooterComponent, DatePipe, MapComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {

  constructor(private eventService: EventService, private userService: UserService, private router: Router) { }

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
    alert("Te has unido al evento correctamente");

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
    this.eventService.updateEventState(this.eventId, "eliminado").subscribe();
  }

  requestEventElimination() {
    // Crea un contenedor div para personalizar el estilo del alert
    const alertContainer = document.createElement("div");
    alertContainer.style.position = "fixed";
    alertContainer.style.top = "50%";
    alertContainer.style.left = "50%";
    alertContainer.style.transform = "translate(-50%, -50%)";
    alertContainer.style.borderRadius = "5px";
    alertContainer.style.textAlign = "right";
    alertContainer.classList.add('bg-white', 'rounded', 'p-4');

    // Crea un título
    const title = document.createElement("h3");
    title.textContent = "¿Estás seguro de solicitar la eliminación?";
    title.style.marginBottom = "15px";
    title.classList.add('fw-semibold', 'text-black');
    alertContainer.appendChild(title);

    // Crea un área de texto para que el usuario ingrese los motivos
    const motivosInput = document.createElement("textarea");
    motivosInput.placeholder = "Ingrese los motivos aquí...";
    motivosInput.style.width = "100%";
    motivosInput.style.height = "100px";
    motivosInput.style.marginBottom = "10px";
    alertContainer.appendChild(motivosInput);



    // Crea un botón de cancelar
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancelar";
    cancelButton.style.backgroundColor = "#890101";
    cancelButton.style.color = "#fff";
    cancelButton.style.padding = "8px 15px";
    cancelButton.style.border = "none";
    cancelButton.style.borderRadius = "3px";
    cancelButton.style.cursor = "pointer";
    cancelButton.addEventListener("click", () => {
      // Cierra el alert sin hacer nada
      document.body.removeChild(alertContainer);
    });
    alertContainer.appendChild(cancelButton);
    // Crea un botón de confirmación
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirmar";
    confirmButton.style.backgroundColor = "#386641";
    confirmButton.style.color = "#fff";
    confirmButton.style.padding = "8px 15px";
    confirmButton.style.border = "none";
    confirmButton.style.cursor = "pointer";
    confirmButton.style.marginLeft = "10px";
    confirmButton.classList.add('bg-secondary', 'rounded')
    confirmButton.addEventListener("click", () => {
      // Obtiene el email del usuario



      // Guarda los motivos en la variable
      const motivosEliminacion = motivosInput.value;
      let user: UserDTO;
      this.userService.getUserById(this.userId).subscribe((userData) => {
        user = userData;
        // Enviar los motivos de eliminación


        this.eventService.sendDeleteRequest({
          email: user.email,
          asunto: "Motivos de eliminacion: ",
          mensaje: motivosEliminacion + " - Evento: " + this.eventId

        }).subscribe(response => {
          alert("Solicitud de eliminación enviada correctamente");
        });
      });

      // Actualizar el estado a "en-eliminacion"
      this.eventService.updateEventState(this.eventId, "en-eliminacion").subscribe(
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

    document.body.appendChild(alertContainer);
  }


  acceptEvent() {
    this.eventService.getEventById(this.eventId).subscribe(
      (data: Event) => {
        console.log(data);
        const emailRecibidor = data.creadoPorUsuarios.username;
        this.eventService.sendDeniedRequest({
          email: emailRecibidor,
          asunto: '¡Evento aprobado! 🎉',
          mensaje: `Tu event ${data.titulo} ha sido aprobado. ¡Felicidades!`
        }).subscribe(response => {
          alert("Evento aprobado con éxito");
          console.log(response);
        });
      }
    );
    this.eventService.updateEventState(this.eventId, "disponible").subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );



  }
  //Denegar evento y enviar mensaje al creador
  declineEvent() {

    const motivos = prompt("Ingrese los motivos por los que se debe mantener el evento: ");
    if (motivos == null || motivos == "") {
      alert("Debe ingresar los motivos de rechazo");
      return;
    }
    this.eventService.getEventById(this.eventId).subscribe(
      (data: Event) => {
        console.log(data);
        const emailRecibidor = data.creadoPorUsuarios.username;
        this.eventService.sendDeniedRequest({
          email: emailRecibidor,
          asunto: "Evento rechazado ❌",
          mensaje: "El evento " + data.titulo + " ha sido rechazado por los siguientes motivos : " + motivos
        }).subscribe(response => {
          alert("Decision de mantener el evento enviada correctamente");
          console.log(response);
        });
      }
    );
    this.eventService.updateEventState(this.eventId, "denegado").subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

  }

  acceptElimination() {
    this.eventService.getEventById(this.eventId).subscribe(
      (data: Event) => {
        console.log(data);
        const emailRecibidor = data.creadoPorUsuarios.username;
        this.eventService.sendDeniedRequest({
          email: emailRecibidor,
          asunto: 'Eliminación aceptada ✔️',
          mensaje: `Hemos aceptado tu solicitud de eliminación. Tu evento ${data.titulo} ha sido eliminado.`
        }).subscribe(response => {
          alert("El evento ha sid oeliminado correctamente");
          console.log(response);
        });
      }
    );
    this.eventService.updateEventState(this.eventId, "eliminado").subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  declineElimination() {

    const motivos = prompt("Ingrese los motivos de rechazo: ");
    if (motivos == null || motivos == "") {
      alert("Debe ingresar los motivos de rechazo");
      return;
    }
    this.eventService.getEventById(this.eventId).subscribe(
      (data: Event) => {
        console.log(data);
        const emailRecibidor = data.creadoPorUsuarios.username;
        this.eventService.sendDeniedRequest({
          email: emailRecibidor,
          asunto: "Eliminación rechazada ❌",
          mensaje: "El evento " + data.titulo + " no puede ser eliminado por los siguientes motivos : " + motivos
        }).subscribe(response => {
          alert("Decision de rechazo enviada correctamente");
          console.log(response);
        });
      }
    );
    this.eventService.updateEventState(this.eventId, "disponible").subscribe(
      (data) => {
        return data;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

  }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
    this.userId = this.userService.getUserIdFromToken();

    this.eventService.getEventDTOById(this.eventId).subscribe(
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
            if (boolean == true) {
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
