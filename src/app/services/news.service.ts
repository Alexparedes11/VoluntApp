import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

    createNews(news: any) {
      return this.http.post(`${this.baseUrl}/noticias/crearNoticia`, news).pipe(
        map((data: any) => {
          return data;
        })
      );
    }

    getNewByTitle(title: string) {
      return this.http.get(`${this.baseUrl}/noticias/${title}`).pipe(
        map((data: any) => {
          return data;
        })
      );
    }

    deleteNews(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/noticias/eliminarNoticia/${id}`);
    }

    editNews(id : number, news: any) {
      return this.http.put(`${this.baseUrl}/noticias/editarNoticia/${id}`, news).pipe(
        map((data: any) => {
          return data;
        })
      );
    }


  }