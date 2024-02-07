import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MapboxService } from '../../services/mapbox.service';

interface AdressInfo {
  place_name: string;
  center: number[];
}

@Component({
  selector: 'app-input-location',
  standalone: true,
  providers: [MapboxService],
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './input-location.component.html',
  styleUrl: './input-location.component.scss'
})

export class InputLocationComponent {
  constructor(private mapboxService: MapboxService) { }

  addresses: AdressInfo[] = [];
  selectedAddress: string | null = null;

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService.searchWord(searchTerm).subscribe((features: any[]) => {
        this.addresses = features.map(feat => ({ place_name: feat.place_name, center: feat.center }));
        console.log(features);
      });
    } else {
      this.addresses = [];
    }
  }

  onSelect(address: string) {
    this.selectedAddress = address;
    console.log(this.selectedAddress);
    this.addresses = [];
  }
}
