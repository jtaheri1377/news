import { HttpInterceptorFn } from '@angular/common/http';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string|null = '';
  // 👇 بررسی کن که window و localStorage در دسترس باشند
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined'
  ) {
    token = localStorage.getItem('token');
  }
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // ✅ بدون فاصله اضافی یا کوتیشن
      },
    });
    return next(authReq);
  }

  return next(req);
};
