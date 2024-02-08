import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  providers: [ContactService, UserService],
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm = new FormGroup({
    email: new FormControl(''),
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    mensaje: new FormControl('')
  });

  constructor(private contactService: ContactService,private userService: UserService) { }

  hacerConsulta() {
    const consulta = {
      email: this.contactForm.value.email,
      asunto: "ID usuario: "+this.userService.isLogged() ? this.userService.getUserIdFromToken().toString() : 'Consulta de invitado',
      mensaje: this.contactForm.value.nombre + ' ' + this.contactForm.value.apellidos+"\n"+"Consulta: "+this.contactForm.value.mensaje
    };
    this.contactService.enviarConsulta(consulta).subscribe(response => {
      console.log(response);
    });
  }
}