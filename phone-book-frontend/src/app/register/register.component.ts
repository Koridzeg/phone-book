import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../types/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = { username: '', email: '', password: '', confirmPassword: '' };
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('registration succesfull', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Registration failed', error);
      }
    );
  }

  isFormValid(): boolean {
    const minLength = 6;
    const emailRegex = this.emailRegex;

    return (
      this.user.password.length >= minLength &&
      this.user.confirmPassword.length >= minLength &&
      this.user.password === this.user.confirmPassword &&
      emailRegex.test(this.user.email) && this.user.username.length >= 3
      
    );
  }

  isEmailValid(): boolean {
    return this.emailRegex.test(this.user.email)
  }
}
