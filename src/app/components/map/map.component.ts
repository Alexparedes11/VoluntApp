import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  @Input() lat: number = 40.4168;
  @Input() lon: number = -3.7038;

  ngOnInit() {
    setTimeout(() => {
      this.map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: 'map',
        style: this.style,
        zoom: 15,
        center: [this.lat, this.lon],
        attributionControl: false,
      });
    }, 50)
  }
}
