import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environments';
import { InstitucionDTO } from '../models/dto/InstitucionDTO';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private baseUrl = environment.server.ip + ':' + environment.server.port;

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/instituciones`, data);
  }

  sendRegisterCompleteEmail(consulta: any): Observable<any> {
    const url = `${this.baseUrl}/contacto/enviarRegistro`;
    return this.http.post(url, consulta);
  }

  getInstitucionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/instituciones/${id}`);
  }
  
  getInstitutionsByState(state: string, page?: number) {
    let params = new HttpParams();
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    return this.http.get<InstitucionDTO>(`${this.baseUrl}/instituciones/buscaporestado/${state}`, { params }).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      })
    );
  }
  updateInstitucionState(id: number, newState: string) {
    const body = newState ;
    return this.http.put(`${this.baseUrl}/instituciones/${id}/estado`, body);
  }
}
