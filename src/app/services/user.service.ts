import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { environment } from '../../environments/environments';
import { UserDTO } from '../models/dto/UserDTO';

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

  edit(id: number, user: any) {
    return this.http.put(`${this.baseUrl}/usuarios/${id}`, user).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  logout() {
    this.cookieService.delete('token');
  }

  getUserIdFromToken(): number {
    const token = this.cookieService.get('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      
      console.log(decodedToken.Tipo);
      return decodedToken.sub;
    }
    return -1;
  }

  getUserTypeFromToken(): number {
    const token = this.cookieService.get('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.Tipo;
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

  getUserById(id: number) {
    return this.http.get<UserDTO>(`${this.baseUrl}/usuarios/${id}`).pipe(
      map((data: UserDTO) => {
        return data;
      })
    );
  }
}
