import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() {}

  login() {
    // This method would be called on successful login
    this.isAuthenticated.next(true);
  }

  logout() {
    // This method would be called on logout
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}