import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  passwordVisible: Boolean = false;
  tabIndex=0

  toggleVisible() {
    this.passwordVisible = !this.passwordVisible;
  }
}
