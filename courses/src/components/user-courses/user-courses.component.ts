import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses/courses.service';

@Component({
  selector: 'app-user-courses',
  standalone: true,
  imports: [AsyncPipe,
    MatExpansionModule,
    MatListModule
  ],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent implements OnInit {

  courses: Course[] | null = null;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  async loadCourses(): Promise<void> {
    try {
      (await this.coursesService.getCourses()).subscribe(
        courses => this.courses == courses
      );
    } catch (e) {
      console.error(e);

    }
  }
}
