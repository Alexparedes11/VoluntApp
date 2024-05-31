import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { parseString } from 'xml2js';
import { environment } from '../../environments/environments';
@Injectable({
    providedIn: 'root'
  })
  export class NewsService {
    private baseUrl = environment.server.ip + ':' + environment.server.port;

    private rssUrl = 'https://feeds.elpais.com/mrss-s/list/ep/site/elpais.com/section/clima-y-medio-ambiente';

    

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

    createNewsInstitution(news: any) {
      return this.http.post(`${this.baseUrl}/noticias/crearNoticiaInstitucion`, news).pipe(
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

    getNewsRSS(): Observable<any> {
      return this.http.get(this.rssUrl, { responseType: 'text' })
        .pipe(
          catchError(this.handleError)
        );
    }
  
    private handleError(error: any): Observable<any> {
      console.error('Ocurrió un error al obtener el feed RSS:', error);
      throw error;
    }
  
    parseXMLData(xmlData: string): Observable<any> {
      return new Observable(observer => {
        parseString(xmlData, (err, result) => {
          if (err) {
            observer.error(err);
          } else {
            observer.next(result);
            observer.complete();
          }
        });
      });
    }
  }
