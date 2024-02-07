import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl: String = 'http://10.100.24.1:9000';

  constructor(private http: HttpClient) { }

  createUser(data: any) {
    return this.http.post(`${this.baseUrl}/usuarios`, data)
  }

  createEvent(data: any) {
    return this.http.post(`${this.baseUrl}/eventos`, data)
  }

  logUser(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  getEvents() {
    return this.http.get(`${this.baseUrl}/eventos`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getEventById(id: number) {
    return this.http.get(`${this.baseUrl}/eventos/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getNews() {
    return this.http.get(`${this.baseUrl}/noticias`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  isUserInEvent(idUser: number, idEvent: number) {
    return this.http.get(`${this.baseUrl}/eventos/isUserInEvento?id_usuario=${idUser}&id_evento=${idEvent}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
