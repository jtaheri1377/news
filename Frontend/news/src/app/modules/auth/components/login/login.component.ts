import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NotifService } from '../../../../shared/services/notif.service';
// import { Login } from '../../models/login.model';
// import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  // imports: [
  //   FormsModule,
  //   RouterLink,
  //   NgClass,
  //   MatFormFieldModule,
  //   ReactiveFormsModule,
  //   MatCheckboxModule,
  //   MatIconModule,
  //   MatInputModule,
  // ],
  standalone:false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  myForm = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
    rememberMe: new FormControl<boolean | null>(null),
  });
  showPass: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private notif: NotifService,
    // private service: AuthService,
    private router: Router
  ) {}

  saveForm() {
    // if (formName == '') return;
    // if (
    //   this.myForm.controls.username.invalid ||
    //   this.myForm.controls.password.invalid
    // ) {
    //   this.notif.warn('لطفا مشخصات را به صورت کامل وارد کنید!');
    //   return;
    // }
    // const data: Login = {
    //   username: this.myForm.value.username!,
    //   password: this.myForm.value.password!,
    // };
    // var sub = this.service.login(data).subscribe(
    //   (res) => {
    //     this.notif.success('به سامانه دارالحکمه خوش آمدید!');
    //     const token = (res as any)['token'];
    //     localStorage.setItem('token', token);
    //   },
    //   (err) => {
    //     this.notif.error('اطلاعات وارد شده صحیح نیست.', '');
    //   }
    // );
    // this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   standalone: false,

//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })
// export class LoginComponent {
//   passwordVisible: Boolean = false;
//   tabIndex=0

//   toggleVisible() {
//     this.passwordVisible = !this.passwordVisible;
//   }
// }
