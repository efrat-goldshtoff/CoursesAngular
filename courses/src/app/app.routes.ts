import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { RegisterComponent } from '../components/register/register.component';
import { authGuard } from '../guards/auth/auth.guard';
import { AuthenticationComponent } from '../components/authentication/authentication.component';
import { teacherManagerGuard } from '../guards/teacher-manager/teacher-manager.guard';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { UserCoursesComponent } from '../components/user-courses/user-courses.component';

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth', component: AuthenticationComponent },
    { path: 'coursesTeacherManager', component: CoursesComponent, canActivate: [teacherManagerGuard] },
    { path: 'coursesAll', component: CourseDetailsComponent },
    { path: 'userCourses', component: UserCoursesComponent }
];
