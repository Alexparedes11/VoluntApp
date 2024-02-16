import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private http: HttpClient) { }

  searchWord(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const countryCode = 'ES';
    return this.http.get(url + query + '.json?types=address&country=' + countryCode + '&access_token=' + environment.mapbox.accessToken)
      .pipe(map((res: any) => {
        return res.features;
      }));
  }

}
