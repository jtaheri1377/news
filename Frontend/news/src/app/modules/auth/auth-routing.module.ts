import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { noAuthGuard } from '../../core/guards/no-auth.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [noAuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
