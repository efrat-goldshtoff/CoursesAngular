import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin, UserRegister } from '../../models/users';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = `http://localhost:3000/api/auth`;

  private currentUserKey = 'currentUser';
  private isLoggedINSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedINSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = this.getCurrentUser();
    if (storedUser) {
      this.isLoggedINSubject.next(true);
    }
  }

  private setCurrentUser(user: any): void {
    sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  getCurrentUser(): any {
    let userJson = sessionStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  private hasStoredUser():boolean{
    return !!sessionStorage.getItem(this.currentUserKey);
  }

  register(user: UserRegister): Observable<any> {
    return this.http.post<UserRegister>(`${this.apiUrl}/register`, user).pipe(
      tap((res:any)=>{
        sessionStorage.setItem('authToken',res.token);
        sessionStorage.setItem('userId',res.userId);
        sessionStorage.setItem('role',res.role);
        sessionStorage.setItem('userName',res.userName);
        this.setCurrentUser(user);
        this.isLoggedINSubject.next(true);
      })
    );
  }

  login(user: UserLogin): Observable<any> {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, user).pipe(
      tap((res:any)=>{
        sessionStorage.setItem('authToken',res.token);
        sessionStorage.setItem('userId',res.userId);
        sessionStorage.setItem('role',res.role);
        sessionStorage.setItem('userName',res.userName);
        this.setCurrentUser(user);
        this.isLoggedINSubject.next(true);
      })
    );
  }

  logOut() {
    sessionStorage.clear();
    this.isLoggedINSubject.next(false);
  }
}


// register(user: UserRegister): Observable<any> {
//   return this.http.post<any>(`${this.apiUrl}/register`, user);
// }

// login(user: UserLogin): Observable<any> {
//   return this.http.post<any>(`${this.apiUrl}/login`, user);
// }
// storeToken(token: string) {
//   sessionStorage.setItem('authToken', token);
// }

// getToken() {
//   return sessionStorage.getItem('authToken');
// }

// clearToken() {
//   sessionStorage.removeItem('authToken');
// }
// getUserFromToken(): string {
//   const token = this.getToken();
//   if (!token)
//     return '';
//   try {
//     const decode: any = jwtDecode(token);
//     return decode.name;
//   } catch (e) {
//     console.error('ERROR Token', e);
//     return '';
//   }
// }

// logOut(): void {
//   sessionStorage.clear();
// }
