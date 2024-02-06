import { Component, Input, numberAttribute } from '@angular/core';
import { DatePipe } from '@angular/common';
import { User } from '../../models/User';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() id: number | null = null;
  @Input() image: string | null = null;
  @Input() title: string | null = null;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() location: string | null = null;
  @Input() volunteersList: User[] | null = null;
  @Input() numVolunteers: number | null = null;
  @Input() createdByUser: string | null = null;
  @Input() createdByInstitution: string | null = null;
  @Input() management: boolean = false;
}