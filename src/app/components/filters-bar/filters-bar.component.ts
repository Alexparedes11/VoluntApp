import { Component } from '@angular/core';

@Component({
  selector: 'app-filters-bar',
  standalone: true,
  imports: [],
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.scss'
})
export class FiltersBarComponent {

  filtrar: boolean = false;

  mostrarContenedor() {
    this.filtrar = !this.filtrar;
  }

}
