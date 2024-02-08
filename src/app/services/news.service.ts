import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environments';
@Injectable({
    providedIn: 'root'
  })
  export class NewsService {
    private baseUrl = environment.server.ip + ':' + environment.server.port;
    constructor(private http: HttpClient) { }
    getNews() {
      return this.http.get(`${this.baseUrl}/noticias`).pipe(
        map((data: any) => {
          return data;
        })
      );
    }
  }