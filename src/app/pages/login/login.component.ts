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
      username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', Validators.required)
    }
  );

  constructor(private userService: UserService, private cookieService: CookieService, private location: Location, private router: Router) { }

  back() {
    this.location.back();
  }

  loguearUsuario(): void {
    this.form.value.username = this.form.value.username?.toLowerCase();
    this.userService.login(this.form.value).subscribe(
      (data: any) => {
        this.cookieService.set('token', data.token);
        this.router.navigate(['/'], {queryParams: {reload: 'true'}});
      },
      (error: any) => {
        console.error('Error al iniciar sesión:', error);
        if (error.status === 403) {
          if (error.error === "La institución está en revisión. Espere a que el administrador valide su cuenta.") {
            this.errorMensaje = error.error;
          } else if (error.error === "La institución ha sido rechazada. Contacte con el administrador para más información.") {
            this.errorMensaje = error.error;
          } else {
            this.errorMensaje = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
          }
        } else {
          this.errorMensaje = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
        }
      }
    );
  }
  
}