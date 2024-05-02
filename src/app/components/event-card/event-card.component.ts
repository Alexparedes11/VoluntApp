import { Component, Input, numberAttribute } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() id: number | null = null;
  @Input() image: string | null = null;
  @Input() title: string | null = null;
  @Input() descriptionSummary: string | null = null;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() location: string | null = null;
  @Input() numVolunteers: number | null = null;
  @Input() createdByUser: string | null = null;
  @Input() createdByInstitution: string | null = null;
  @Input() nombreInstituciones: Array<string> | null = null;
  @Input() tags: Array<string> | null = null;

  currentIndex: number = 0;
  currentInstitution: string = '';

  stringFunction() {
    if (this.nombreInstituciones) {
      this.currentInstitution = this.nombreInstituciones[0];
    }
  }

  intervalFunction() {
    if (this.nombreInstituciones) {
      this.currentIndex =
        (this.currentIndex + 1) % this.nombreInstituciones.length;
      this.currentInstitution = this.nombreInstituciones[this.currentIndex];
    }
  }

  ngOnInit() {
    this.stringFunction();
    setInterval(() => {
      this.intervalFunction();
    }, 2000);
  }
}
