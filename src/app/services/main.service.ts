import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseUrl: String = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  createUser(data: any) {
    return this.http.post(`${this.baseUrl}/usuarios`, data)
  }

  searchUser(data: any) {
    return this.http.get(`${this.baseUrl}/usuarios`, data)
  }
}
