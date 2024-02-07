import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({providedIn: 'root'})

export class ContactService {

    private baseUrl = 'http://localhost:9000/contacto';
    
    constructor(private http: HttpClient) {}

    enviarConsulta(consulta: any): Observable<any> {
        const url = `${this.baseUrl}/enviarCorreo`;
        return this.http.post(url, consulta);
    }
}