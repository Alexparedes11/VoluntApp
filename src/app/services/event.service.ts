import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = environment.server.ip + ':' + environment.server.port;

  constructor(private http: HttpClient) { }

  createEvent(data: any) {
    return this.http.post(`${this.baseUrl}/eventos`, data)
  }

  getEvents(page?: number) {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    return this.http.get(`${this.baseUrl}/eventos`, { params }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }


  getEventsByUser(id: number) {
    return this.http.get(`${this.baseUrl}/eventos/usuario/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getEventsCreatedByUser(id: number) {
    return this.http.get(`${this.baseUrl}/eventos/creadoPorUsuario/${id}`).pipe(
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
  
  isUserCreator(idUser: number, idEvent: number) {
    const body = {
      id_usuario: idUser,
      id_evento: idEvent
      // Hay que comparar id del usuario con el id del creador del evento
      
    };
    return this.http.post(`${this.baseUrl}/eventos/creadoPorUsuario/${idUser}/${idEvent}`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

}
