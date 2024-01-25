import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  institucion: boolean = false;

  cambiarform(opcion: string) {
    this.institucion = true;
    console.log(this.institucion);
    console.log(opcion);

    if (opcion === 'institucion') {
      this.institucion = true;
    } else {
      this.institucion = false;
    }
    
  }
}
