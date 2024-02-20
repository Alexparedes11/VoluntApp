import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [EventService, UserService],
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(private eventService: EventService, private userService: UserService, private route: ActivatedRoute, private renderer: Renderer2) { }

  isLogged: boolean = false;
  isAdmin: boolean = false;
  muestraMenu: boolean = false;

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

    // let reloadParam = this.route.snapshot.queryParamMap.get('reload');
    // if (reloadParam && reloadParam === 'true') {
    //   for (let i = 0; i < 1; i++) {
    //     window.location.reload();
    //   }
      
      
    // }
  

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

