import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor( private http: HttpClient ) { }

  private baseUrl = environment.server.ip + ':' + environment.server.port;

  register(data: any) {
    return this.http.post(`${this.baseUrl}/instituciones`, data)
  }
  sendRegisterCompleteEmail(consulta: any): Observable<any> {
    const url = `${this.baseUrl}/contacto/enviarRegistro`;
    return this.http.post(url, consulta);
  }

  getInstitucionById(id: number) {
    return this.http.get(`${this.baseUrl}/instituciones/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

}
