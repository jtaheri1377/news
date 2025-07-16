import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { NotifService } from '../../../../shared/services/notif.service';
import { Login } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: false,

  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements AfterViewInit, OnDestroy {
  myForm = new FormGroup({
    username: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    phone: new FormControl<string | null>(null),
  });
  showPass: boolean = false;
  sendViaSms: boolean = false;
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
    if (this.myForm.invalid) {
      if (this.myForm.value.username!.length < 8) {
        this.notif.warn('تعداد حروف نام کاربری کمتر از حد مجاز است');
        return;
      }
      if (this.sendViaSms)
        if (this.myForm.value.phone!.length < 11) {
          this.notif.warn('شماره موبایل معتبر نیست!');
          return;
        }
    }
    if (this.sendViaSms) {
      const data: ResetPasswordBySms = {
        username: this.myForm.value.username!,
        phone: this.myForm.value.phone!,
      };
      this.isLoading = true;
      var sub = this.service.resetPasswordBySms(data).subscribe(
        () => {
          this.router.navigate(['/auth', 'login']); // حالا که همه درخواست‌ها کامل شدن، ریدایرکت کن
          this.notif.info('رمز به موبایل شما ارسال شد!');
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
        }
      );
      this.subs.push(sub);
    } else {
      const data: ResetPasswordByEmail = {
        username: this.myForm.value.username!,
      };
      this.isLoading = true;
      var sub = this.service.resetPasswordByEmail(data).subscribe(
        () => {
          this.router.navigate(['/auth', 'login']); // حالا که همه درخواست‌ها کامل شدن، ریدایرکت کن
          this.notif.info('رمز به ایمیل شما ارسال شد!');
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
        }
      );
      this.subs.push(sub);
    }
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
import { Router } from '@angular/router';

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

export interface ResetPasswordByEmail {
  username: string;
}

export interface ResetPasswordBySms {
  username: string;
  phone: string;
}
