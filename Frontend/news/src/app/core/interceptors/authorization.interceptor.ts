import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotifService } from '../../shared/services/notif.service';
import { state } from '@angular/animations';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = '';
  let notif = inject(NotifService);

  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined'
  ) {
    token = localStorage.getItem('token');
  }

  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred. Please try again.'; // پیام پیش‌فرض

      if (error.error instanceof ErrorEvent) {
        // خطای سمت کلاینت/شبکه
        errorMessage = `Network Error: ${error.error.message}`;
      } else if (error.error && typeof error.error === 'object') {
        // 👈 اینجا تغییر اصلی رو اعمال می‌کنیم:
        // اگر فرمت خطای شما "{StatusCode: 500, Message: "..."}" است
        if (error.error.Message) {
          // توجه کنید که 'Message' با حرف بزرگ شروع شده
          errorMessage = error.error.Message;
        }
        // اگر بک‌اند یک فیلد 'message' با حرف کوچک در ریشه پاسخ خطا برگردانده باشد (فرمت رایج‌تر JSON)
        else if (error.error.message) {
          errorMessage = error.error.message;
        }
        // اگر فرمت Problem Details باشد و شامل فیلد 'errors' باشد
        else if (error.error.errors) {
          const validationMessages: string[] = [];
          for (const key in error.error.errors) {
            if (
              error.error.errors.hasOwnProperty(key) &&
              Array.isArray(error.error.errors[key])
            ) {
              validationMessages.push(...error.error.errors[key]);
            }
          }
          if (validationMessages.length > 0) {
            errorMessage = validationMessages.join(' | '); // ترکیب پیام‌های اعتبارسنجی
          } else {
            errorMessage = error.message; // fallback به پیام HttpErrorResponse
          }
        }
      } else if(error.status==403) {
        errorMessage="شما دسترسی لازم را ندارید!"
      } else {
        // اگر 'error.error' یک رشته ساده باشد یا فرمت نامشخص
        errorMessage = error.message;
      }

      // نمایش پیام خطا با alert()
      if (typeof window !== 'undefined') {
        notif.error(`${errorMessage}`);
      }

      // پرتاب مجدد خطا
      return throwError(() => new Error(errorMessage));
    })
  );
};
