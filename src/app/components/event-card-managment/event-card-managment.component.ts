import { Component } from '@angular/core';

@Component({
  selector: 'app-event-card-managment',
  standalone: true,
  imports: [],
  templateUrl: './event-card-managment.component.html',
  styleUrl: './event-card-managment.component.scss'
})
export class EventCardManagmentComponent {
  eventoCreado: boolean = false;
}
