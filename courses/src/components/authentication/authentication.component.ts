import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [MatCardModule,
     RouterModule,
     MatButtonModule
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

}
