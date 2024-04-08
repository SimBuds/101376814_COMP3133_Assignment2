import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GraphQLService } from '../services/graph-ql.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showSignupModal: boolean = false;
  signupUsername: string = '';
  signupEmail: string = '';
  signupPassword: string = '';

  constructor(
    private authService: AuthService, 
    private graphQLService: GraphQLService,
    private router: Router
  ) {}

  onLogin() {
    if (this.username && this.password) {
      this.graphQLService.login(this.username, this.password).subscribe({
        next: (response) => {
          this.authService.login();
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Login error', error);
        }
      });
    }
  }

  openSignupModal() {
    this.showSignupModal = true;
  }

  submitSignup() {
    this.graphQLService.signup(this.signupUsername, this.signupEmail, this.signupPassword).subscribe({
      next: (response) => {
        this.toggleSignupModal();
        this.authService.login();
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error('Signup error', error);
      }
    });
  }

  toggleSignupModal() {
    this.showSignupModal = !this.showSignupModal;
  }  
}