import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    MatToolbarModule,
    MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'courses';
  // token: any = '';
  userName!:string;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    // this.token = sessionStorage.getItem('authToken');
    this.userName = this.authService.getCurrentUser().name;
  }
}
