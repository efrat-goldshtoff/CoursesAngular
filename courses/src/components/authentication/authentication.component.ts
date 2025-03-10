import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [MatCardModule,
    RouterModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})

export class AuthenticationComponent {
  authForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.authForm = this.fb.group({
      name: [{
        value: '',
        disabled: this.getMode() == 'Login'
      },
      [Validators.required,
      Validators.minLength(2)
      ]],
      email: ['', [Validators.required,
      Validators.email
      ]],
      password: ['', [Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      role: [
        null,
        this.getMode() == 'Login' ? [] :
          [
            Validators.required
          ]]
    });
  }
  get user(): { [key: string]: AbstractControl } {
    return this.authForm.controls;
  }

  setMode(mode1: string) {
    sessionStorage.setItem('mode', mode1)
  }

  getMode() {
    return sessionStorage.getItem('mode');
  }

  async onSubmit() {
    if (this.authForm.invalid)
      return;
    const { name, email, password, role } = this.authForm.value;

    try {
      if (this.getMode() == 'Login') {
        this.authService.login({ email, password }).subscribe(
          (res: any) => {
            console.log('In Login');
          });
        this.snackBar.open('Login success', 'Close', { duration: 3000 });
      }
      else {
        this.authService.register({ name, email, password, role }).subscribe(
          (res: any) => {
            console.log('In Register');
          }
        );
        this.snackBar.open('Register success', 'Close', { duration: 3000 });
        // this.onSwitchMode();
        this.setMode('');
      }
      this.authForm.reset();
    } catch (e) {
      this.snackBar.open('Authentication failed', 'Close', { duration: 3000 });
    }
  }

  onSwitchMode() {
    if (this.getMode() == 'Login')
      this.setMode('Register');
    else {
      this.setMode('Login');
    }
    if (this.getMode() == 'Login') {
      this.authForm.get('name')?.disable();
    } else {
      this.authForm.get('name')?.enable();
    }
  }

}
