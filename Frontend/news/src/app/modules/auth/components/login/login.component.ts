import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
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
import { Subscription, switchMap } from 'rxjs';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
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
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit, OnDestroy {
  myForm = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
    rememberMe: new FormControl<boolean | null>(null),
  });
  showPass: boolean = false;
  isLoading: boolean = false;
  subs: Subscription[] = [];
  @ViewChild('username') usernameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private notif: NotifService,
    private service: AuthService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.usernameInput.nativeElement.focus();
  }

  saveForm() {
    if (
      this.myForm.controls.username.invalid ||
      this.myForm.controls.password.invalid
    ) {
      this.notif.warn('لطفا مشخصات را به صورت کامل وارد کنید!');
      return;
    }
    const data: Login = {
      username: this.myForm.value.username!,
      password: this.myForm.value.password!,
    };
    this.isLoading = true;

    var sub = this.service
      .login(data)
      .pipe(
        // بعد از اینکه لاگین موفقیت آمیز بود، به درخواست بعدی (گرفتن پرمیشن‌ها) سوئیچ کن
        switchMap((res: any) => {
          const token = (res as any)['token'];
          localStorage.setItem('token', token); // ذخیره توکن
          return this.service.getUserPermission(); // درخواست پرمیشن‌ها رو برگردون
        })
      )
      .subscribe(
        (permissionsRes: any) => {
          console.log('Permissions received:', permissionsRes);
          localStorage.setItem('permissions', JSON.stringify(permissionsRes));
          // اینجا می‌تونی پرمیشن‌ها رو در یک سرویس ذخیره کنی
          // this.authService.setUserPermissions(permissionsRes); // مثال

          this.router.navigate(['/']); // حالا که همه درخواست‌ها کامل شدن، ریدایرکت کن
          this.notif.success('به سامانه خوش آمدید!');
          this.service.loginStatusUpdate$.next(true);
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          // اگر خطایی در لاگین یا گرفتن پرمیشن‌ها رخ داد
          this.notif.error(
            'اطلاعات وارد شده صحیح نیست یا خطایی در دریافت دسترسی‌ها رخ داد.'
          );
        }
      );
    this.subs.push(sub);
  }

  saveUserPermissions() {
    var sub = this.service.getUserPermission().subscribe((res: any) => {
      console.log(res);
    });
    this.subs.push(sub);
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
