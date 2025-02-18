import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);
  nav = inject(Router);
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  error: string = '';
  loading:boolean = false;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      this.authService.login(username); // Call the login service
      this.nav.navigate(['/transactions']); // Redirect after login
    } else {
      this.error = 'Please enter a username.';
    }
  }

}
