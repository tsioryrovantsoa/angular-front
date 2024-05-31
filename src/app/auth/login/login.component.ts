import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,MatCardModule,MatFormFieldModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {}

  onSubmit() {
    this.authService.logIn(this.username, this.password).subscribe(success => {
      if (success) {
        this.snackBar.open('Connexion réussie ✔️', 'Fermer', {
          duration: 3000
        });
        this.router.navigate(['/home']);
      } else {
        this.snackBar.open('Identifiants invalides ❌', 'Fermer', {
          duration: 3000
        });
      }
    });
  }

  OnInit(){
    localStorage.removeItem('token');
  }
}
