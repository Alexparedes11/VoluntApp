import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  providers: [MainService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  institucion: string = "";

  datos = new FormGroup (
    { correo: new FormControl('') ,
     contraseña: new FormControl('') }
  );

  constructor(private mainService: MainService) {}

  login() {
    console.log(this.datos.value);
  }

  searchUsuario() {
    this.mainService.searchUser(this.datos.value).subscribe();
  }
}


