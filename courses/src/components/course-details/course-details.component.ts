import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatListModule } from '@angular/material/list'
import { Observable } from 'rxjs';
import { Course, Lesson } from '../../models/course';
import { CoursesService } from '../../services/courses/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../services/lessons/lessons.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../services/users/users.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [AsyncPipe,
    MatExpansionModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {

  @Input()
  course!: Course;
  isTeacher = false;
  lessons: Lesson[] = [];
  teacherName: string = '';

  constructor(
    private router: ActivatedRoute,
    private lessonService: LessonsService,
    // public dialog: MatDialog,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.course.id = Number(this.router.snapshot.paramMap.get('course.id'));
    this.getLessons();
    this.isTeacher = sessionStorage.getItem('role') == 'teacher';
    this.teacherName = this.userService.getUserName(this.course.teacherId);
  }

  addLesson(lesson: Lesson) {
    this.lessonService.createLesson(this.course.id, lesson).subscribe({
      next: res => {
        this.lessons = res;
      },
      error: (e) => {
        console.error('Error fetching lessons', e);
      }
    })
  }

  getLessons(): void {
    this.lessonService.getLessons(this.course.id).subscribe({
      next: res => {
        this.lessons = res;
      },
      error: (e) => {
        console.error('Error fetching lessons', e);
      }
    })
  }

  updateLesson(lesson: Lesson): void {
    this.lessonService.updateLesson(this.course.id, lesson).subscribe({
      next: res => {
        this.lessons = res;
      },
      error: (e) => {
        console.error('Error fetching lessons', e);
      }
    })
  }

  deleteLesson(lessonId: number): void {
    this.lessonService.deleteLesson(this.course.id, lessonId).subscribe({
      next: res => {
        this.getLessons();
      },
      error: (e) => {
        console.error('Error deleting lesson', e);
      }
    });
  }

  // openLessonDialog(lessonId:number,courseName:string,teacherName:string,courseId:number):void{
  //   const dialogRef=this.dialog.open(Lesson)
  // }

}
