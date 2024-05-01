import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TAGS_CATEGORIES } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getPredictions(eventInformation: string): Observable<any> {
    const url =
      'https://comprehend-it.p.rapidapi.com/predictions/ml-zero-nli-model';

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'X-RapidAPI-Key': '54ca8a2c07mshcb6fd65d5016682p129e38jsnfcbe09ed04a0',
      'X-RapidAPI-Host': 'comprehend-it.p.rapidapi.com',
    });

    const options = {
      headers: headers,
    };

    const body = {
      labels: TAGS_CATEGORIES,
      text: eventInformation,
    };

    return this.http.post(url, body, options);
  }
}
