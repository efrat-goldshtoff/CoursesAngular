import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    })
  }

  getUserName(id: number): string {
    let userName: string = '';
    try {
      this.getUser(id).subscribe(data => {
        userName = data.name || '';
      })
    } catch (e) {
      console.log(e);
    }
    return userName;
  }

  updateUser(id: number, user: any): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.put(`${this.apiUrl}/${id}`, user, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }

  deleteUser(id: number): Observable<any> {
    const token = sessionStorage.getItem('authToken');
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });
  }
}
