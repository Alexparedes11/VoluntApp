import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [UserService, CookieService],
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

  constructor(private userService: UserService, private cookieService: CookieService, private location: Location, private router: Router) { }

  back() {
    this.location.back();
  }

  loguearUsuario(): void {
    this.userService.login(this.form.value).subscribe(
      (data: any) => {
        this.cookieService.set('token', data.token);
      }
    );

    // Aquí hay que hacer que si se loguea le mande para /
  }
}