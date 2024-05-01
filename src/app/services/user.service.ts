import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environments';
import { UserDTO } from '../models/dto/UserDTO';
import { InstitucionDTO } from '../models/dto/InstitucionDTO';

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
      
      return decodedToken.sub;
    }
    return -1;
  }

  getUserTypeFromToken(): string {
    const token = this.cookieService.get('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken.Tipo;
    } else {
      return "Error";
    }

  }

  getUserByIdInstitucion(id: number) {
    return this.http.get<InstitucionDTO>(`${this.baseUrl}/instituciones/${id}`).pipe(
      map((data: InstitucionDTO) => {
        return data;
      })
    );
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
  sendRegisterCompleteEmail(consulta: any): Observable<any> {
    const url = `${this.baseUrl}/contacto/enviarRegistro`;
    return this.http.post(url, consulta);
}
isEmailInDB(email: string) {
  const params = new HttpParams().set('email', email);
  return this.http.get(`${this.baseUrl}/usuarios/username`, { params }).pipe(
    map((data: any) => {
      return data;
    })
  );
}
  passwordRecovery(data: any): Observable<any> {
    const url = `${this.baseUrl}/contacto/passwordRecovery`;
    return this.http.post(url, data);
  }

  editPasswordByEmail(email: string, password: string) {
    const url = `${this.baseUrl}/usuarios/password/${email}`;
    const body = { password };
    return this.http.put(url, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }


}
