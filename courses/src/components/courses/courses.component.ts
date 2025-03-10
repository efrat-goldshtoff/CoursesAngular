import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { AsyncPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { CoursesService } from '../../services/courses/courses.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AsyncPipe,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    // NgTemplateOutlet,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  // courses: Observable<Course[]> = new Observable<Course[]>;
  courses: Course[] = [];
  enrolledCourses: Set<number> = new Set();

  constructor(private coursesService: CoursesService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      title: [],
      description: [],
      teacherId: []
    })
  }
  public courseForm: FormGroup;
  ngOnInit(): void {
    this.loadCourses();
  }

  addCourse(add: string) {
    sessionStorage.setItem('addCourse', '');
  }
  getAdd() {
    return sessionStorage.getItem('addCourse');
  }


  onSubmitAddCourse() {

  }

  private async loadCourses() {
    try {
      (await this.coursesService.getCourses()).subscribe(
        courses => this.courses == courses
      );
    } catch (e) {
      this.snackBar.open('Failed to load courses', 'Close', { duration: 3000 });
    }
  }

  async enroll(courseId: number) {
    try {
      await this.coursesService.enrollStudentInCourse(courseId, this.authService.getCurrentUser().id);
      this.enrolledCourses.add(courseId);
      this.snackBar.open('Enrolled successfully!', 'Close', { duration: 3000 });
    } catch (e) {
      this.snackBar.open('Failed to enroll', 'Close', { duration: 3000 });
    }
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourses.has(courseId);
  }
}