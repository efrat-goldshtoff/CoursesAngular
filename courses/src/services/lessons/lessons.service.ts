import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/course';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getLessons(courseId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers });
  }

  getLessonById(courseId: number, lessonId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  createLesson(courseId: number, lesson: Lesson): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lesson, { headers });
  }

  updateLesson(courseId: number, lesson: Lesson): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lesson.id}`, lesson, { headers });
  }

  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }
}
