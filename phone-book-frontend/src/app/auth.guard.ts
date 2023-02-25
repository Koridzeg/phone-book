import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {  UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private UserService: UserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.UserService.isAuthenticated()) {
      this.router.navigate(['/phonebooks']);
      return false;
    } else {
      return true;
    }
  }
}