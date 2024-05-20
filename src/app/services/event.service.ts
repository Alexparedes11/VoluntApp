import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environments';
import { EventDTO } from '../models/dto/EventDTO';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = environment.server.ip + ':' + environment.server.port;

  constructor(private http: HttpClient) {}

  createEvent(data: EventDTO) {
    return this.http.post(`${this.baseUrl}/eventos`, data);
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

  getEventsBySearchQuery(query: string, page?: number) {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    return this.http
      .get(`${this.baseUrl}/eventos/buscar/${query}`, { params })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getEventsByState(state: string, page?: number) {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    return this.http
      .get<EventDTO>(`${this.baseUrl}/eventos/buscaporestado/${state}`, {
        params,
      })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  getEventsOrderByDate(page?: number) {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    return this.http
      .get(`${this.baseUrl}/eventos/ordenarporfecha`, { params })
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  updateEventState(id: number, newState: string) {
    const body = newState;
    return this.http.put(`${this.baseUrl}/eventos/${id}/estado`, body);
  }

  getEventsByUser(id: number) {
    return this.http.get(`${this.baseUrl}/eventos/usuario/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getEventsByInstitution(id: number) {
    return this.http.get(`${this.baseUrl}/eventos/institucion/${id}`).pipe(
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

  getEventsCreatedByInstitution(id: number) {
    return this.http
      .get(`${this.baseUrl}/eventos/creadoPorInstitucion/${id}`)
      .pipe(
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

  getEventDTOById(id: number) {
    return this.http.get(`${this.baseUrl}/eventosDTO/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  isUserInEvent(idUser: number, idEvent: number) {
    const body = {
      id_usuario: idUser,
      id_evento: idEvent,
    };
    return this.http.post(`${this.baseUrl}/eventos/isUserInEvento`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  isInstitucionInEvent(idInstitution: number, idEvent: number) {
    const body = {
      id_institucion: idInstitution,
      id_evento: idEvent,
    };
    return this.http
      .post(`${this.baseUrl}/eventos/isInstitutionInEvento`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  addUserToEvent(idUser: number, idEvent: number) {
    const body = {
      id_usuario: idUser,
      id_evento: idEvent,
    };
    return this.http.post(`${this.baseUrl}/eventos/apuntar-usuario`, body);
  }

  addInstitutionToEvent(idInstitution: number, idEvent: number) {
    console.log(
      'La id del evento es la siguiente: ' +
        idEvent +
        ' y la de la institucion: ' +
        idInstitution
    );
    const body = {
      id_institucion: idInstitution,
      id_evento: idEvent,
    };
    return this.http.post(`${this.baseUrl}/eventos/apuntar-institucion`, body);
  }

  removeUserFromEvent(idUser: number, idEvent: number) {
    const body = {
      id_usuario: idUser,
      id_evento: idEvent,
    };
    return this.http.post(`${this.baseUrl}/eventos/desapuntar-usuario`, body);
  }

  removeInstitutionFromEvent(idInstitution: number, idEvent: number) {
    const body = {
      id_institucion: idInstitution,
      id_evento: idEvent,
    };
    return this.http.post(
      `${this.baseUrl}/eventos/desapuntar-institucion`,
      body
    );
  }

  isUserCreator(idUser: number, idEvent: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/eventos/esCreador/${idUser}/${idEvent}`
    );
  }

  obtenerEventosPerfil(id: number) {
    return this.http.get(`${this.baseUrl}/eventos/profile/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  ordenarporvoluntarios() {
    return this.http.get(`${this.baseUrl}/eventos/ordenarporvoluntarios`);
  }
  ordenarporfechaProxima() {
    return this.http.get(`${this.baseUrl}/eventos/ordenarporfechaProxima`);
  }
  ordenarporfechaAntigua() {
    return this.http.get(`${this.baseUrl}/eventos/ordenarporfechaAntigua`);
  }

  getFilteredEvents(
    finicio?: string,
    ffin?: string,
    ubicacion?: string,
    categorias?: string[]
  ) {
    let params = new HttpParams();
    if (finicio) {
      params = params.append('finicio', finicio);
    }
    if (ffin) {
      params = params.append('ffin', ffin);
    }
    if (ubicacion) {
      params = params.append('ubicacion', ubicacion);
    }
    if (categorias && categorias.length > 0) {
      categorias.forEach((categoria) => {
        params = params.append('categorias', categoria);
      });
    }

    return this.http.get(`${this.baseUrl}/eventos/filtrar`, { params });
  }

  shareEvent(longUrl: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ url: longUrl });

    return this.http.post<{ shortUrl: string }>(`${this.baseUrl}/enlaces/acortar`, body, { headers })
      .pipe(
        map(response => response.shortUrl),
        catchError(error => {
          console.error('Error shortening URL:', error);
          throw error;
        })
      );
  }

  validateEvent(eventInformation: string) {
    const url = 'https://text-moderator.p.rapidapi.com/api/v1/moderate';

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'X-RapidAPI-Key': '54ca8a2c07mshcb6fd65d5016682p129e38jsnfcbe09ed04a0',
      'X-RapidAPI-Host': 'text-moderator.p.rapidapi.com',
    });

    const options = {
      headers: headers,
    };

    const body = {
      input: eventInformation,
    };

    return this.http.post(url, body, options);
  }
}
