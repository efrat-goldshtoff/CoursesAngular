import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses/courses.service';
import { ActivatedRoute } from '@angular/router';

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
  courseId:number=1;
  userCourses$!:Observable<Course[]>
  constructor(private coursesService:CoursesService,private route:ActivatedRoute){
    this.userCourses$ = this.coursesService.userCourses$;
    this.coursesService.getUserCourses();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const id=params.get('id')
      this.courseId=id?Number(id):-1;
      // this.userCourses$
    })
  }
  deleteCurrentCourse(courseId:number){
    this.coursesService.deleteCurrentCourseUser(courseId);
  }
}
