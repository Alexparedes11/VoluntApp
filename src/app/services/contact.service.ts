import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
@Injectable({ providedIn: 'root' })

export class ContactService {

    private baseUrl = environment.server.ip + ':' + environment.server.port;

    constructor(private http: HttpClient) { }

    enviarConsulta(consulta: any): Observable<any> {
        const url = `${this.baseUrl}/contacto/enviarCorreo`;
        return this.http.post(url, consulta);
    }

    sendDeleteRequest(consulta: any): Observable<any> {
        const url = `${this.baseUrl}/contacto/enviarSolicitud`;
        return this.http.post(url, consulta);
      }
    
      sendDeniedRequest(consulta: any): Observable<any> {
        const url = `${this.baseUrl}/contacto/enviarRespuestaDenegada`;
        return this.http.post(url, consulta);
      } 
}