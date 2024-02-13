import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor( private http: HttpClient ) { }

  private baseUrl = environment.server.ip + ':' + environment.server.port;

  register(data: any) {
    return this.http.post(`${this.baseUrl}/instituciones`, data)
  }

}
