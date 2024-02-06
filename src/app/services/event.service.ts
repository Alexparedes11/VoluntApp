import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl: String = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  createUser(data: any) {
    return this.http.post(`${this.baseUrl}/usuarios`, data)
  }

  login(data: any) {
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

  isUserInEvent(idUser: number, idEvent: number) {
    const body = {
      id_usuario: idUser,
      id_evento: idEvent
    };
    return this.http.post(`${this.baseUrl}/eventos/isUserInEvento`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addUserToEvent(idUser: number, idEvent: number) {
    const body = {
      id_usuario: idUser,
      id_evento: idEvent
    };
    return this.http.post(`${this.baseUrl}/eventos/apuntar-usuario`, body);
  }

  removeUserFromEvent(idUser: number, idEvent: number) {
    const body = {
      id_usuario: idUser,
      id_evento: idEvent
    };
    return this.http.post(`${this.baseUrl}/eventos/desapuntar-usuario`, body);
  }
}
