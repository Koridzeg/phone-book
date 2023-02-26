import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { AuthGuard } from './auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordTokenComponent } from './reset-password-token/reset-password-token.component';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset/:token',
    component: ResetPasswordTokenComponent,
    canActivate: [AuthGuard],
  },
  { path: 'phonebooks', component: PhonebookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
