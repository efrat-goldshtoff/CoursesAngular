import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegister } from '../../models/users';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `http://localhost:3000/api/auth`;

  constructor(private http: HttpClient) { }
  register(user: UserRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }
  storeToken(token: string) {
    sessionStorage.setItem('authToken', token);
  }

  getToken() {
    return sessionStorage.getItem('authToken');
  }

  clearToken() {
    sessionStorage.removeItem('authToken');
  }
  getUserFromToken(): string {
    const token = this.getToken();
    if (!token)
      return '';
    try {
      const decode: any = jwtDecode(token);
      return decode.name;
    } catch (e) {
      console.error('ERROR Token', e);
      return '';
    }
  }
}
