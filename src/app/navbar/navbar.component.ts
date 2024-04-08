import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}