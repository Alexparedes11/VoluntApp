import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EventService } from '../../services/event.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  providers: [EventService, CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  institucion: string = "";
  form = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl('')
    }
  );

  constructor(private eventService: EventService, private cookieService: CookieService, private location: Location, private router: Router) { }

  back() {
    this.location.back();
  }

  loguearUsuario(): void {
    this.eventService.logUser(this.form.value).subscribe(
      (data: any) => {
        this.cookieService.set('token', data.token);
      }
    );

    // Aquí hay que hacer que si se loguea le mande para /
  }
}