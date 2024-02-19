import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { InstitutionService } from '../../services/institution.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [UserService, InstitutionService],
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // Parámetros
  cifPattern = /^[A-Z]{1}[0-9]{8}$/;
  contrasenaConfirmadaInvalida: boolean = false;
  institucion: boolean = false;


  constructor(private userService: UserService, private institucionService: InstitutionService, private location: Location, private router: Router) { }

  back() {
    this.location.back();
  }

  // Formulario para registrar un usuario
  formUsuario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    dni: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contraseña: new FormControl('', Validators.required),
  });

  // Formulario para registrar una institución
  formInstitucion = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cif: new FormControl('', [Validators.required, Validators.pattern(this.cifPattern)]),
    personaCargo: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    nombreLegal: new FormControl('', Validators.required),
  });


  pagina: 1 | 2 | 3 = 1;

  siguientePagina() {
    this.pagina++;
  }

  anteriorPagina() {
    this.pagina--;
  }

  primeraPagina() {
    this.pagina = 1;
  }

  segundaPagina() {
    this.pagina = 2;
  }

  terceraPagina() {
    this.pagina = 3;
  }

  cambiarform(opcion: string) {
    this.institucion = true;

    if (opcion === 'institucion') {
      this.institucion = true;
      this.formUsuario.reset();
    } else {
      this.institucion = false;
      this.formInstitucion.reset();
    }
  }

  convertirAMayusculas(event: any): void {
    event.target.value = event.target.value.toUpperCase();
  }

  validarConfirmacion() {
    if (this.institucion) {
      const contraseña = this.formInstitucion.get('password')?.value;

      const confirmacionContrasena = (document.querySelector('[placeholder="Confirmar contraseña"]') as HTMLInputElement).value;

      if (contraseña !== confirmacionContrasena) {
        this.contrasenaConfirmadaInvalida = true;
      } else {
        this.contrasenaConfirmadaInvalida = false;
      }
    } else {
      const contraseña = this.formUsuario.get('contraseña')?.value;

      const confirmacionContrasena = (document.querySelector('[placeholder="Confirmar contraseña"]') as HTMLInputElement).value;

      if (contraseña !== confirmacionContrasena) {
        this.contrasenaConfirmadaInvalida = true;
      } else {
        this.contrasenaConfirmadaInvalida = false;
      }
    }

  }

  handleSubmit() {
    if (this.institucion) {
      this.crearInstitucion();
      this.router.navigate(['/login']);
    } else {
      this.crearUsuario();
      this.router.navigate(['/login']);
    }
  }

  crearUsuario() {
    this.userService.register(this.formUsuario.value).subscribe(() => {
      // Usuario registrado con éxito, ahora enviar el correo
      const emailReg = this.formUsuario.value.email;
      this.userService.sendRegisterCompleteEmail({
        email: emailReg,
        asunto: "¡Registro completado! 🎉",
        mensaje: "¡Bienvenido a Voluntapp! Tu registro se ha completado con éxito."
      }).subscribe(response => {
        alert("Registro exitoso, revisa tu correo para confirmar tu cuenta.");
        console.log(response);
      });
    })
  }

  crearInstitucion() {
    console.log(this.formInstitucion.value);
    this.institucionService.register(this.formInstitucion.value).subscribe();
  }
}
