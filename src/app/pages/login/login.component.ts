import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(private mainService: MainService, private cookieService: CookieService) { }

  loguearUsuario(): void {
    this.mainService.logUser(this.form.value).subscribe(
      (data: any) => {
        this.cookieService.set('token', data.token);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}