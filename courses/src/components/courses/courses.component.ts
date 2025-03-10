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
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      title: ['',
        [Validators.required,
        Validators.minLength(2)]
      ],
      description: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]]
      // ,
      // teacherId: ['',[
      // Validators.required
      // ]]
    })
  }

  get cont(): { [key: string]: AbstractControl } {
    return this.courseForm.controls;
  }

  public courseForm: FormGroup;
  ngOnInit(): void {
    this.loadCourses();
  }

  setAdd(add: string) {
    sessionStorage.setItem('add', add);
  }
  getAdd() {
    return sessionStorage.getItem('add');
  }
  getTeacherId() {
    return Number(sessionStorage.getItem('id'));
  }

  async onSubmitAddCourse() {
    if (this.courseForm.invalid)
      return;

    const { title, description } = this.courseForm.value;
    try {
      (await this.coursesService.createCourse({ title, description, teacherId: this.getTeacherId() })).subscribe(
        (res: any) => {
          console.log('In Adding Course');
        }
      );
      this.snackBar.open('Adding course success', 'Close', { duration: 3000 });

    } catch (e) {
      this.snackBar.open('Adding course failed', 'Close', { duration: 3000 });
    }

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