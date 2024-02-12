import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { NgClass, NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  providers: [UserService, CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  institucion: string = "";
  errorMensaje: string = '';

  form = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', Validators.required)
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
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMensaje = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      }
    );
  }
}