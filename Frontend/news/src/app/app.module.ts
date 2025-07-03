import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from './shared/shared.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { authorizationInterceptor } from './core/interceptors/authorization.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FontAwesomeModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 3000,

      positionClass: 'toast-top-center', // موقعیت پیش‌فرض
      // preventDuplicates: true, // جلوگیری از toast های تکراری
      extendedTimeOut: 1000, // مدت زمان اضافی برای نمایش toast بعد از اینکه ماوس روی اون قرار گرفت.
      // گزینه‌های رایج: 'toast-top-right', 'toast-bottom-left', 'toast-top-center', 'toast-bottom-right' و ...
      preventDuplicates: true, // از نمایش toast های تکراری (با پیام یکسان) جلوگیری میکنه.
      closeButton: true, // نمایش دکمه بستن (x) در کنار هر toast.
      progressBar: true, // نمایش نوار پیشرفت زمان باقی‌مانده (در پایین toast).
      newestOnTop: true, // toast جدید در بالا نمایش داده میشه. (true = جدیدترین در بالا)
      tapToDismiss: true, // با کلیک روی toast بسته میشه.
      disableTimeOut: false, // اگر true باشه، toast خود به خود بسته نمیشه. (معمولاً برای پیغام‌های مهم).
      enableHtml: false, // اگر true باشه، میتونید html در پیام toast قرار بدید. (خطر XSS رو در نظر بگیرید).
      easeTime: 300, // سرعت انیمیشن‌های ورود و خروج (بر حسب میلی‌ثانیه).

      // 💡 برای زیباسازی بیشتر و شخصی‌سازی ظاهر
      toastClass: 'ngx-toastr', // کلاس CSS پیش‌فرض برای toast container
      iconClasses: {
        // کلاس‌های CSS برای آیکون هر نوع toast
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
      },
      // titleClass: 'toast-title', // کلاس CSS برای عنوان toast
      // messageClass: 'toast-message', // کلاس CSS برای متن پیام toast

      // می‌توانید انیمیشن‌های ورودی و خروجی را نیز مشخص کنید.
      // animation: 'fadeIn', // ورود: 'fadeIn', 'slideInLeft', 'slideInRight'
      // exitAnimation: 'fadeOut', // خروج: 'fadeOut', 'slideOutLeft', 'slideOutRight'
    }),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authorizationInterceptor])),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
