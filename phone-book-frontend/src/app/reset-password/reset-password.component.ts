import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  emailSent:boolean = false;
  constructor(private UserService: UserService) {}

  forgotPassword(email: string) {
    this.UserService.forgotPassword(email).subscribe(
      response => {
        console.log(response.message);
      },
      error => {
        console.log(error);
      }
    );
  }
}
