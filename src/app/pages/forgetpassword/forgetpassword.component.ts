import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  providers: [Location, UserService],
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {

    constructor(private userService: UserService, private location: Location, private fb: FormBuilder) { }

    back() {
        this.location.back();
    }

    resetPasswordForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
    });

    resetPassword() {
      const emailInDB = this.resetPasswordForm.value.email;
      this.userService.isEmailInDB(emailInDB).subscribe(
        (response) => {
          console.log(response);
          if (response === true) {
            this.sendPasswordRecoveryEmail(emailInDB);
            this.userService.editPasswordByEmail(emailInDB,this.newPassword).subscribe();
          } else {
            alert("El correo no está en la base de datos.");
            // Puedes mostrar un mensaje o realizar otras acciones si el correo no está en la base de datos.
          }
        },
        (error) => {
          console.error('Error al verificar el correo electrónico:', error);
        }
      );
    }

    randomPassword(length: number) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    newPassword = this.randomPassword(15);

    sendPasswordRecoveryEmail(email: string) {
      this.userService.passwordRecovery({
        email: email,
        asunto: "Contraseña generada automáticamente",
        mensaje: "Contraseña nueva: "+this.newPassword
      }).subscribe(
        (response) => {
          alert("Solicitud de restablecimiento de contraseña enviada correctamente");
        },
        (error) => {
          console.error('Error al enviar el correo electrónico de recuperación de contraseña:', error);
        }
      );
  }
}
