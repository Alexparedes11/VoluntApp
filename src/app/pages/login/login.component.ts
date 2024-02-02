import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  providers: [MainService, CookieService],
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

  constructor(private mainService: MainService, private cookieService: CookieService, private location: Location) { }

  back() {
    this.location.back();
  }

  loguearUsuario(): void {
    this.mainService.logUser(this.form.value).subscribe(
      (data: any) => {
        this.cookieService.set('token', data.token);
      }
    );

    if (this.cookieService.get('token') != null ) {
      this.location.go('/');
    }
  }
}