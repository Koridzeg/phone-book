import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoggingUser } from '../types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: LoggingUser = { username: '', password: '', token: '' };

  loginError: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.user).subscribe(
      (response) => {
        console.log('User Logged in!');
        this.router.navigate(['/phonebooks']);
      },
      (error) => {
        console.log('Login failed', error);
        this.loginError = 'Incorrect username or password';
      }
    );
  }
}
