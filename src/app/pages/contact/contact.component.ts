import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  providers: [ContactService],
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

  constructor(private contactService: ContactService) { }

  hacerConsulta() {
    const consulta = {
      email: this.contactForm.value.email,
      asunto: this.contactForm.value.nombre + ' ' + this.contactForm.value.apellidos,
      mensaje: this.contactForm.value.mensaje
    };
    this.contactService.enviarConsulta(consulta).subscribe(response => {
      console.log(response);
    });
  }
}