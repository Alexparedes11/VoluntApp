import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
    providedIn: 'root'
  })

  export class ProfileService {
    private baseUrl = environment.server.ip + ':' + environment.server.port;

    constructor(private http: HttpClient) { }

    getData(id: number) {
      return this.http.get(`${this.baseUrl}/usuarios/${id}`).pipe(
        map((data: any) => {
          return data;
        })
      );
    }
  }