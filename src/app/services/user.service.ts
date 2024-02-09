import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { environment } from '../../environments/environments';
import { User } from '../models/User';
import { EventDTO } from '../models/dto/EventDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.server.ip + ':' + environment.server.port;

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data)
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/usuarios`, data)
  }

  logout() {
    this.cookieService.delete('token');
  }

  getUserIdFromToken(): number {
    const token = this.cookieService.get('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.sub;
    }
    return -1;
  }

  isAdmin(): boolean {
    const token = this.cookieService.get('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.Rol === 'Admin';
    }
    return false;
  }

  isLogged(): boolean {
    const token = this.cookieService.get('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return !jwtHelper.isTokenExpired(token) && decodedToken.sub !== undefined;
    }
    return false;
  }
  
  getUserDTOById(id: number) {
    return this.http.get<EventDTO>(`${this.baseUrl}/usuarios/${id}`).pipe(
      map((data: EventDTO) => {
        return data;
      })
    );
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/usuarios/${id}`).pipe(
      map((data: User) => {
        return data;
      })
    );
  }
}
