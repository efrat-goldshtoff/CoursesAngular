import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course, Lesson } from '../../models/course';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
// import { Observable } from 'rxjs';
import { CoursesService } from '../../services/courses/courses.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AsyncPipe,
    // ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    NgTemplateOutlet,
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
  courses: Course[] = [];
  enrolledCourses: Set<number> = new Set();

  constructor(private coursesService: CoursesService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.loadCourses();
    }

    private async loadCourses(){
      try{
        (await this.coursesService.getCourses()).subscribe(
          courses=> this.courses==courses
        );
      }catch(e){
        this.snackBar.open('Failed to load courses','Close',{duration:3000});
      }
    }

    async enroll(courseId:number){
      try{
        await this.coursesService.enrollStudentInCourse(courseId,this.authService.getCurrentUser().id);
        this.enrolledCourses.add(courseId);
        this.snackBar.open('Enrolled successfully!','Close',{duration:3000});
      }catch(e){
        this.snackBar.open('Failed to enroll','Close',{duration:3000});
      }
    }

    isEnrolled(courseId:number):boolean{
      return this.enrolledCourses.has(courseId);
    }
}
// private fb: FormBuilder
// this.allCourses$ = this.coursesService.allCourses$;
// this.coursesService.getCourses();

// setIsAddCourse() {
//   this.isAddCourse = !this.isAddCourse;
// }
// setIsUpdate(course: Course) {
//   this.isUpdate = !this.isUpdate;
//   this.idCurrentCourse = course.id;
//   this.courseForm.setValue({
//     title: course.title,
//     description: course.description
//   });
// }
// setIsUpdateLesson(lesson: Lesson) {
//   this.isUpdateLesson = !this.isUpdateLesson;
//   this.idCurrentLesson = lesson.id;
//   this.courseIdLessonUpdate = lesson.courseId;
//   this.lessonForm.setValue({
//     title: lesson.title,
//     content: lesson.content
//   });
// }
// setIsAddLesson(courseId: number) {
//   this.isAddLesson = !this.isAddLesson;
//   this.idCurrentCourse = courseId;
// }
// ngOnInit(): void {
//   this.role = this.coursesService.getRoleByToken();
//   this.coursesService.getUserIdByToken();
//   this.courseForm = this.fb.group({
//     title: ['', [
//       Validators.required,
//       Validators.minLength(4),
//       Validators.maxLength(15)
//     ]],
//     description: ['', [
//       Validators.required,
//       Validators.minLength(10),
//       Validators.maxLength(50)
//     ]]
//   })
// }
// get course():{[key:string]:AbstractControl}{
//   return this.courseForm.controls;
// }
// get lesson():{[key:string]:AbstractControl}{
//   return this.lessonForm.controls;
// }
// deleteCourse(courseId:number){
//   this.coursesService.deleteCourse(courseId);
// }
// onSubmitLessonUpdate(){
//   this.isUpdateLesson=!this.isUpdateLesson;
//   this.lessonUpdate=this.lessonForm.value;
//   this.lessonUpdate.id=this.idCurrentLesson;
//   this.lessonUpdate.courseId=this.courseIdLessonUpdate;
//   this.coursesService.updateLesson(this.lessonUpdate);
// }
// onSubmitCourseUpdate(){
//   this.updateCourse();
//   this.isUpdate=!this.isUpdate;
// }
// updateCourse(){
//   this.courseUpdate=this.courseForm.value;
//   this.courseUpdate.teacherId=this.coursesService.getUserIdByToken();
//   this.courseUpdate.id=this.idCurrentCourse;
//   this.coursesService.updateCourse(this.courseUpdate);
// }
// onSubmitAddLesson(){
//   this.isAddLesson=!this.isAddLesson;
//   this.lessonAdd=this.lessonForm.value;
//   this.lessonAdd.courseId=this.idCurrentCourse;
//   this.coursesService.addLesson(this.lessonAdd);
// }
// deleteLesson(courseId:number,lessonId:number){
//   this.coursesService.deleteLesson(courseId,lessonId);
// }
// onSubmitAddCourse(){
//   this.courseUpdate=this.courseForm.value;
//   this.courseUpdate.teacherId=this.coursesService.getUserIdByToken();
//   this.coursesService.addCourse(this.courseUpdate);
//   this.isAddCourse=!this.isAddCourse;
// }





// role: string = '';
// courseForm!: FormGroup;
// lessonForm!: FormGroup;
// lessonFromValues!: any;
// lessonUpdate!: Lesson;
// lessonAdd!: Lesson;
// idCurrentLesson: number = 1;
// isUpdate: boolean = false;
// idCurrentCourse: number = 1;
// currentCourse: any;
// courseUpdate!: Course;
// courseAdd!: Course;
// isUpdateLesson: boolean = false;
// isAddLesson: boolean = false;
// courseIdLessonUpdate: number = 1;
// isAddCourse: boolean = false;
// allCourses$: Observable<Course[]> | undefined;
