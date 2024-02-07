import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class NewsService {
    private baseUrl: String = 'http://localhost:9000';
    constructor(private http: HttpClient) { }
    getNews() {
      return this.http.get(`${this.baseUrl}/noticias`).pipe(
        map((data: any) => {
          return data;
        })
      );
    }
  }