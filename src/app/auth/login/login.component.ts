import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.logIn(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/home']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
