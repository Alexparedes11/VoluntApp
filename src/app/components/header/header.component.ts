import { Component, Input } from '@angular/core';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [EventService, UserService],
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private eventService: EventService, private userService: UserService) { }

  isLogged: boolean = false;
  isAdmin: boolean = false;
  muestraMenu: boolean = false;

  menu() {
      this.muestraMenu = !this.muestraMenu;
    }

  logout() {
    this.userService.logout();
  }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
    this.isLogged = this.userService.isLogged();
  }

  
  // mostrarMensaje(mensaje: string) {
  //       var mensajeElement = document.getElementById("mensaje") as HTMLElement;
  //       mensajeElement.innerText = mensaje;
  //       mensajeElement.style.display = "block";

  //       setTimeout(function () {
  //           mensajeElement.style.display = "none";
  //       }, 1000);
  //   }
};

