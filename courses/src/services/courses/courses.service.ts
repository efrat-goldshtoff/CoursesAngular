import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
// import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';
  constructor(private http: HttpClient) { }

  async getCourses(): Promise<Observable<Course[]>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Course[]>(this.apiUrl, { headers });
  }

  async getCourseById(id: number): Promise<Observable<Course>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<Course>(`${this.apiUrl}/${id}`, { headers });
  }

  async createCourse(course: Course): Promise<Observable<any>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(this.apiUrl, course, { headers });
  }

  async updateCourse(id: number, course: Course): Promise<Observable<any>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.put(`${this.apiUrl}/${id}`, course, { headers });
  }

  async deleteCourse(id: number): Promise<Observable<any>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  async enrollStudentInCourse(courseId: number, userId: number): Promise<Observable<any>> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers });
  }

  private getToken(): string {
    let res = sessionStorage.getItem('authToken');
    if (!res) {
      console.error('No connected user');
      throw new Error('No connected user')
    }
    return res;
  }
}
/*

  private courseSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  private userCourseSubject: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  allCourses$: Observable<Course[]>;
  userCourses$: Observable<Course[]>;

  private apiUrl = 'http://localhost:3000/api/courses';
  constructor(private http: HttpClient) {
    this.allCourses$ = this.courseSubject.asObservable();
    this.userCourses$ = this.userCourseSubject.asObservable();
  }

  getCourses() {
    return this.http.get<Course[]>(this.apiUrl).subscribe({
      next: (data) => {
        data.forEach(course => {
          this.getLessonByCourse(course.id);
        });
        this.courseSubject.next(data);
      },
      error: (error) => {
        console.error('Failed to fetch courses', error);
      }
    });
  }

  getUserCourses() {
    const studentId = this.getUserIdByToken();
    this.http.get<Course[]>(`${this.apiUrl}/student/${studentId}`).subscribe({
      next: (data) => {
        data.forEach(course => {
          this.getLessonsToUserCourse(course.id)
        });
        this.userCourseSubject.next(data)
      },
      error: (e) => {
        console.error('Failed to fetch my courses', e);
      }
    })
  }
  getLessonByCourse(courseId: number) {
    this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`).subscribe({
      next: (lessons) => {
        const courses = this.courseSubject.getValue();
        const courseUpdate = courses.find(course => course.id === courseId);
        if (courseUpdate) {
          courseUpdate.lessons = lessons;
          this.courseSubject.next([...courses]);
        }
      }
    })
  }
  getLessonsToUserCourse(courseId: number) {
    this.http.get<Lesson[]>(`${this.apiUrl}/${courseId}/lessons`).subscribe({
      next: (lessons) => {
        const courses = this.userCourseSubject.getValue();
        const courseUpdate = courses.find(course => course.id === courseId);
        if (courseUpdate) {
          courseUpdate.lessons = lessons;
          this.userCourseSubject.next([...courses]);
        }
      }
    })
  }
  addCourse(course: Course) {
    this.http.post<any>(this.apiUrl, course).subscribe({
      next: (res) => {
        this.getCourses()
      },
      error: (e) => {
        console.error('ERROR: ', e);
      }
    })
  }

  updateCourse(course: Course) {
    this.http.post<any>(`${this.apiUrl}/${course.id}`, course).subscribe({
      next: (res) => {
        this.getCourses();
      },
      error: (e) => {
        console.error('ERROR: ', e);
      }
    });
  }
  deleteCourse(courseId: number) {
    this.http.delete(`${this.apiUrl}/${courseId}`).subscribe({
      next: (res) => {
        this.getCourses();
      },
      error: (e) => {
        console.error('ERROR:', e);
      }
    })
  }

  deleteLesson(courseId: number, lessonId: number) {
    this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`).subscribe({
      next: (res) => {
        this.getCourses();
        this.getLessonByCourse(courseId);
      },
      error: (e) => {
        console.error('ERROR:', e);
      }
    })
  }

  addLesson(lesson: Lesson) {
    this.http.post<Lesson>(`${this.apiUrl}/${lesson.courseId}/lessons`, lesson).subscribe({
      next: (res) => {
        this.getCourses();
        this.getLessonByCourse(lesson.courseId);
      },
      error: (e) => {
        console.error('ERROR:', e);
      }
    })
  }

  updateLesson(lesson: Lesson) {
    this.http.put(`${this.apiUrl}/${lesson.courseId}/lessons/${lesson.id}`, lesson).subscribe({
      next: (res) => {
        this.getCourses();
        this.getLessonByCourse(lesson.courseId);
      },
      error: (e) => {
        console.error('ERROR:', e);
      }
    })
  }

  addCourseToUser(courseId: number) {
    const userId = this.getUserIdByToken();
    this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }).subscribe({
      next: (res) => {
        this.getCourses();
      },
      error: (e) => {
        console.error('ERROR:', e);
      }
    })
  }

  deleteCurrentCourseUser(courseId: number) {
    const userId = this.getUserIdByToken();
    this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, { body: { userId } }).subscribe({
      next: (res) => {
        this.getCourses();
      },
      error: (e) => {
        console.error('ERROR:', e);
      }
    })
  }

  getRoleByToken(): string {
    const token = sessionStorage.getItem('authToken');
    if (!token)
      return '';
    try {
      const deCoded: any = jwtDecode(token);
      return deCoded.role;
    } catch (e) {
      console.error('ERROR Token', e);
      return '';
    }
  }

  getUserIdByToken(): number {
    const token = sessionStorage.getItem('authToken');
    if (!token)
      return -1;
    try {
      const deCoded: any = jwtDecode(token);
      return deCoded.userId;
    } catch (e) {
      console.error('ERROR Token', e);
      return -1;
    }
  }
*/
