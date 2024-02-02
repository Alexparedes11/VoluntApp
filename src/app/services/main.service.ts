import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseUrl: String = 'http://10.100.21.1:9000';

  constructor(private http: HttpClient) { }

  createUser(data: any) {
    return this.http.post(`${this.baseUrl}/usuarios`, data)
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
}
