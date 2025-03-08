import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatListModule } from '@angular/material/list'
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [AsyncPipe,
    MatExpansionModule,
    MatListModule
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  allCourses$: Observable<Course[]> | undefined;
  constructor(private coursesService: CoursesService,
    private router: Router) {
    this.allCourses$ = this.coursesService.allCourses$;
    this.coursesService.getCourses();
  }
  addCourseToUser(courseId: number) {
    this.coursesService.addCourseToUser(courseId);
  }
  deleteCourse(courseId: number) {
    this.coursesService.deleteCurrentCourseUser(courseId);
  }
}
