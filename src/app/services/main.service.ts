import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseUrl: String = 'http://10.100.24.1:9000';

  constructor(private http: HttpClient) { }

  createUser(data: any) {
    return this.http.post(`${this.baseUrl}/usuarios`, data)
  }
}
