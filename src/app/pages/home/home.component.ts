import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { EventDTO } from '../../models/dto/EventDTO';
import { EventService } from '../../services/event.service';

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
    finicio: new FormControl(null),
    ffin: new FormControl(null),
    ubicacion: new FormControl(''),
  });

  showFilters() {
    this.muestraFiltros = !this.muestraFiltros;
  }

  selectedOption: string = 'Reciente';

  orderByTimeOrPeople(e: any) {
    const searchType = e.target.value;
    switch (searchType) {
      case 'reciente':
        this.eventService.ordenarporfechaProxima().subscribe(
          (data: any) => {
            this.events = data.content;
            this.currentPage = data.pageable.pageNumber;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        );
        break;
      case 'Popular':
        this.eventService.ordenarporvoluntarios().subscribe(
          (data: any) => {
            this.events = data.content;
            this.currentPage = data.pageable.pageNumber;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        );
        break;
      case 'antiguos':
        this.eventService.ordenarporfechaAntigua().subscribe(
          (data: any) => {
            this.events = data.content;
            this.currentPage = data.pageable.pageNumber;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        );
        break;
    }
  }

  clearFilters() {
    this.filtersForm.reset();
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

  obtenerFechaActual(): string {
    const hoy = new Date();
    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDate();
    const horas = hoy.getHours();
    const minutos = hoy.getMinutes();
    const formatoMes = mes < 10 ? `0${mes}` : mes;
    const formatoDia = dia < 10 ? `0${dia}` : dia;
    return `${hoy.getFullYear()}-${formatoMes}-${formatoDia}`;
  }

  applyFilters() {
    const finicio = this.filtersForm.value.finicio + "T00:00";
    const ffin = this.filtersForm.value.ffin + "T00:00";
    const ubicacion = this.filtersForm.value.ubicacion;

    
    console.log(finicio);

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
        console.log(this.events);
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
