import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CoursesService } from '../../services/courses/courses.service';

export const teacherManagerGuard: CanActivateFn = (route, state) => {
  const isLogin = sessionStorage.getItem('authToken');
  const router = inject(Router);
  const service = inject(CoursesService);
  const status = service.getRoleByToken();
  console.log(status);
  if (status === 'admin' || status === 'teacher') {
    return true;
  }
  return true;
};
