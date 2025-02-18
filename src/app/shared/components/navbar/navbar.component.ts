import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authService$ = inject(AuthService);
  nav = inject(Router);

  get isLoggedIn(): boolean {
    return this.authService$.isLoggedIn();
  }

  logout() {
    this.authService$.logout();
    this.nav.navigate(['/login']);
  }
  home() {
    this.nav.navigate(['/transactions']);
  }

  transactionDetails() {
    this.nav.navigate([`/transactions/id`]);
  }

  fileUpload() {
    this.nav.navigate(['/upload']);
  }
}
