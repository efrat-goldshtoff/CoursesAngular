import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [MatCardModule,
     RouterModule,
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

}
