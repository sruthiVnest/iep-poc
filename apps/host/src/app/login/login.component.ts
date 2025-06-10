// Standalone LoginComponent for Angular with mock authentication service
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, InputsModule, LabelModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    // Mock authentication logic
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth_token', 'mock-token');
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid credentials';
    }
  }
}

// Mock AuthService for future API integration
export class AuthService {
  login(username: string, password: string) {
    // Replace this with actual API call
    return new Promise((resolve, reject) => {
      if (username === 'admin' && password === 'admin') {
        resolve({ token: 'mock-token' });
      } else {
        reject('Invalid credentials');
      }
    });
  }
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }
  logout() {
    localStorage.removeItem('auth_token');
  }
}
