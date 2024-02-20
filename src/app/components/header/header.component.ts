import { Component, Renderer2 } from '@angular/core';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { InstitutionService } from '../../services/institution.service';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [EventService, UserService, InstitutionService],
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private userService: UserService, private institutionService: InstitutionService, private renderer: Renderer2) { }

  isLogged: boolean = false;
  isAdmin: boolean = false;
  muestraMenu: boolean = false;
  userProfilePicture: string = "";

  menu() {
    this.muestraMenu = !this.muestraMenu;
  }

  logout() {
    this.userService.logout();
  }

  mostrarMenu() {
    this.muestraMenu = !this.muestraMenu;
  }

  ngOnInit(): void {

    this.isAdmin = this.userService.isAdmin();
    this.isLogged = this.userService.isLogged();

    const tipo = this.userService.getUserTypeFromToken();

    const userId = this.userService.getUserIdFromToken();
    if (tipo == "Usuario") {
      this.userService.getUserById(userId).subscribe((data: any) => {
        this.userProfilePicture = data.fotoPerfil;
      });
    } else {
      this.institutionService.getInstitucionById(userId).subscribe((data: any) => {
        this.userProfilePicture = data.fotoPerfil;
      });
    }

    this.renderer.listen('document', 'DOMContentLoaded', () => {
      const menuIcon: HTMLElement | null = document.querySelector('#menu-icon');
      const navbar: HTMLElement | null = document.querySelector('.navbar');
  
      if (menuIcon && navbar) {
        menuIcon.onclick = () => {
          menuIcon.classList.toggle('bx-x');
          navbar.classList.toggle('active');
        };
      }
    });
  }
};

