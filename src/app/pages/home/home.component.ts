import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { EventService } from '../../services/event.service';
import { EventDTO } from '../../models/dto/EventDTO';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [EventService],
  imports: [HeaderComponent, FooterComponent, EventCardComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private eventService: EventService) { }
  events: EventDTO[] = [];
  pages: Array<number> = [];
  currentPage: number = 0;

  muestraFiltros: boolean = false;

  filtersForm: FormGroup = new FormGroup({
    finicio: new FormControl(''),
    ffin: new FormControl(''),
    ubicacion: new FormControl(''),
  });

  showFilters() {
    this.muestraFiltros = !this.muestraFiltros;
  }

  applyFilters() {
    const finicio = this.filtersForm.value.finicio;
    const ffin = this.filtersForm.value.ffin;
    const ubicacion = this.filtersForm.value.ubicacion;

    if (finicio && ffin && !ubicacion) {
      this.eventService.getEventsByDateFilter(finicio, ffin).subscribe(
        (data) => {
          this.events = data.content;
          this.currentPage = data.pageable.pageNumber;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      )
    } else if (ubicacion && !finicio && !ffin) {
      this.eventService.getEventsByLocationFilter(this.filtersForm.value.ubicacion).subscribe(
        (data) => {
          this.events = data.content;
          this.currentPage = data.pageable.pageNumber;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      )
    } else if (finicio && ffin && ubicacion) {
      this.eventService.getEventByDateAndLocationFilter(finicio, ffin, ubicacion).subscribe(
        (data) => {
          this.events = data.content;
          this.currentPage = data.pageable.pageNumber;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      )
    }
  }

  filterEventsBySearch(search: string) {
    if (search) {
      this.eventService.getEventsBySearchQuery(search).subscribe(
        (data) => {
          this.events = data.content;
          this.currentPage = data.pageable.pageNumber;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    } else {
      this.eventService.getEventsByState("disponible").subscribe(
        (data) => {
          this.events = data.content;
          this.currentPage = data.pageable.pageNumber;
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }
  }

  goToPage(page: number) {
    this.eventService.getEventsByState("disponible", page).subscribe(
      (data) => {
        this.events = data.content;
        this.currentPage = data.pageable.pageNumber;
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
