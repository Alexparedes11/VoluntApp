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
  @Input() image: string | null = null;
  @Input() title: string | null = null;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() location: string | null = null;
  @Input({ transform: numberAttribute }) volunteers: Number = 1;
  @Input() createdBy: User | null = null;

  @Input() management: boolean = false;
}