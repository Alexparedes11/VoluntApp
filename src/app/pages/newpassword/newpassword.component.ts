import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
    selector: 'app-newpassword',
    standalone: true,
    templateUrl: './newpassword.component.html',
    styleUrl: './newpassword.component.scss',
    providers: [Location, UserService],
    imports: [HeaderComponent, FooterComponent, ReactiveFormsModule]
})
export class NewpasswordComponent {
  constructor(private userService: UserService, private location: Location, private fb: FormBuilder) { }

  changePasswordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.email]],
    password2: ['', [Validators.required, Validators.email]],

});

passwordsMatch: boolean = true;

changePassword() {
  const password = this.changePasswordForm.value.password;
  const password2 = this.changePasswordForm.value.password2;

  if (password === password2 && password !== '') {
    const userId = this.userService.getUserIdFromToken();

    if (userId !== -1) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          const userEmail = user.email;

          this.userService.editPasswordByEmail(userEmail, password).subscribe(
            () => {
              this.passwordsMatch = true;
              alert('Contraseña cambiada con éxito.');
            },
            (error) => {
              console.error('Error al cambiar la contraseña:', error);
            }
          );
        },
        (error) => {
          console.error('Error al obtener información del usuario:', error);
        }
      );
    }
  } else {
    this.passwordsMatch = false;
  }
}

back() {
  this.location.back();
}
}
