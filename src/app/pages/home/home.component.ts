import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventService } from '../../services/event.service';
import { EventDTO } from '../../models/dto/EventDTO';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [EventService],
  imports: [HeaderComponent, FooterComponent, EventCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private eventService: EventService) { }
  events: EventDTO[] = [];
  pages: Array<number> = [];
  currentPage: number = 0;

  muestraFiltros: boolean = false;

  showFilters() {
    this.muestraFiltros = !this.muestraFiltros;
  }

  filterEventsBySearch(search: string) {
    console.log(search);
  }

  goToPage(page: number) {
    this.eventService.getEventsByState("disponible", page).subscribe(
      (data) => {
        this.events = data.content;
        this.currentPage = data.pageable.pageNumber;
        console.log(this.currentPage);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  ngOnInit(): void {
    this.eventService.getEventsByState("disponible").subscribe(
      (data) => {
        this.events = data.content;
        for (let i = 0; i < data.totalPages; i++) {
          this.pages.push(i + 1);
        }
        this.currentPage = data.pageable.pageNumber;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}
