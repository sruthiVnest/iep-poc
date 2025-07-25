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
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [false] // No validators, so it's optional
    });
  }

  login() {
    const { username, password, rememberMe } = this.loginForm.value;
    // Mock authentication logic with role
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth_token', 'mock-token');
      localStorage.setItem('user_role', 'admin');
      if (rememberMe) {
        localStorage.setItem('remembered_username', username);
      } else {
        localStorage.removeItem('remembered_username');
      }
      this.router.navigate(['/dashboard']);
    } else if (username === 'user' && password === 'user') {
      localStorage.setItem('auth_token', 'mock-token');
      localStorage.setItem('user_role', 'user');
      if (rememberMe) {
        localStorage.setItem('remembered_username', username);
      } else {
        localStorage.removeItem('remembered_username');
      }
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid credentials';
    }
  }

  ngOnInit() {
    const remembered = localStorage.getItem('remembered_username');
    if (remembered) {
      this.loginForm.patchValue({ username: remembered, rememberMe: true });
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
