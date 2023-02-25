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

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.user).subscribe(
      (response) => {
        console.log('registration succesfull', response);
        this.router.navigate(['/login'])
      },
      (error) => {
        console.log('Registration failed', error);
      }
    );
  }

  
}
