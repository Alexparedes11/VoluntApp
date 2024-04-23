import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { EventDTO } from '../../models/dto/EventDTO';
import { EventService } from '../../services/event.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [EventService],
  imports: [
    HeaderComponent,
    FooterComponent,
    EventCardComponent,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private eventService: EventService) {}
  events: EventDTO[] = [];
  pages: Array<number> = [];
  currentPage: number = 0;

  muestraFiltros: boolean = false;
  categorias: Array<string> = [
    'Solidaridad',
    'Ayuda',
    'Niños',
    'Mascotas',
    'Medio Ambiente',
    'Mayores',
    'Alimentación',
    'Salud',
    'Deporte',
  ];

  filtersForm: FormGroup = new FormGroup({
    finicio: new FormControl(''),
    ffin: new FormControl(''),
    ubicacion: new FormControl(''),
    categorias: new FormControl(''),
  });

  resetOrderBy() {
    const orderByTimeOrPeople = document.getElementById(
      'orderByTimeOrPeople'
    ) as HTMLSelectElement;
    orderByTimeOrPeople.value = 'popular';
  }

  updateContent(data: any) {
    this.pages = [];
    this.events = data.content;
    for (let i = 0; i < data.totalPages; i++) {
      this.pages.push(i + 1);
    }
  }

  showFilters() {
    this.muestraFiltros = !this.muestraFiltros;
  }

  orderByTimeOrPeople(e: any) {
    const searchType = e.target.value;
    switch (searchType) {
      case 'popular':
        this.eventService.ordenarporvoluntarios().subscribe(
          (data: any) => {
            this.updateContent(data);
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        );
        break;
      case 'proximos':
        this.eventService.ordenarporfechaAntigua().subscribe(
          (data: any) => {
            this.updateContent(data);
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
    this.eventService.getEventsByState('disponible').subscribe(
      (data) => {
        this.updateContent(data);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
    this.resetOrderBy();
  }

  applyFilters() {
    const finicio = this.filtersForm.value.finicio;
    const ffin = this.filtersForm.value.ffin;
    const ubicacion = this.filtersForm.value.ubicacion;
    const categorias = this.filtersForm.value.categorias;

    this.eventService
      .getFilteredEvents(finicio, ffin, ubicacion, categorias)
      .subscribe(
        (data: any) => {
          this.updateContent(data);
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    this.resetOrderBy();
  }

  filterEventsBySearch(search: string) {
    if (search) {
      this.eventService.getEventsBySearchQuery(search).subscribe(
        (data) => {
          this.updateContent(data);
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    } else {
      this.eventService.getEventsByState('disponible').subscribe(
        (data) => {
          this.updateContent(data);
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
    }
  }

  goToPage(page: number) {
    this.eventService.getEventsByState('disponible', page).subscribe(
      (data) => {
        this.updateContent(data);
        this.currentPage = data.pageable.pageNumber;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  ngOnInit(): void {
    this.eventService.getEventsByState('disponible').subscribe(
      (data) => {
        this.updateContent(data);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
}
