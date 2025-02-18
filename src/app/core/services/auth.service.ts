import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkAuth());
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  login(username: string): void {  // Simplified login (replace with your actual auth)
    localStorage.setItem('isLoggedIn', 'true'); // Store token or auth status
    localStorage.setItem('username', username); // Store username
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
