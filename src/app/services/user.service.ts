import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: String = 'http://10.100.24.1:9000';

  constructor(private cookieService: CookieService, private http: HttpClient) { }

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

  logout() {
    this.cookieService.delete('token');
  }
  
  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/usuarios/${id}`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
