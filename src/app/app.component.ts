import { AuthService } from './core/services/auth.service';
import { SharedModule } from './shared/shared.module';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'bank-transaction-analyzer-app';
  authService$ = inject(AuthService);
  get isLoggedIn(): boolean {
    return this.authService$.isLoggedIn();
  }
}
