import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map, take, timeout } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1),
      timeout(3600000),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}