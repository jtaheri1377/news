// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from '../../../../environments/environment';
// import { Login } from '../models/login.model';
// import { NotifService } from '../../../shared/services/notif.service';
// import { Router } from '@angular/router';
// import { BehaviorSubject, of } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';
// import { Observable } from 'tinymce';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   Url = environment.ApiEndPoint;
//   constructor(
//     private http: HttpClient,
//     private notif: NotifService,
//     private router: Router
//   ) {}

//   loginStatusUpdate$ = new BehaviorSubject<boolean>(false);

//   saveIntegration(data: Login) {
//     return this.http.post(`${this.Url}IntegrationLoginData/save`, data);
//   }

//   login(data: Login) {
//     return this.http.post(`${this.Url}auth/login`, data);
//   }

//   getUserPermission() {
//     return this.http.get(`${this.Url}permission/getAllByToken`);
//   }

//   isLoggedIn(): boolean {
//     const token = localStorage.getItem('token');
//     if (token == undefined || token == null) {
//       this.loginStatusUpdate$.next(false);
//       this.logout();
//       // this.router.navigate(['/auth/login']);
//       return false;
//     }

//     try {
//       const decoded: any = jwtDecode(token);
//       var isValid = decoded.exp > Date.now() / 1000;
//       if (!isValid) {
//         this.loginStatusUpdate$.next(false);
//         this.logout();
//         this.router.navigate(['/auth/login']);

//         return isValid;
//       } else {
//         this.loginStatusUpdate$.next(true);
//         return isValid;
//       }
//     } catch {
//       this.notif.error('لطفا وارد حساب کاربری خود شوید');
//       this.loginStatusUpdate$.next(false);
//       return false;
//     }
//   }

//   loginStatus$(): Observable<boolean> {
//     return this.loginStatusUpdate$.asObservable();
//   }

//   logout() {
//     const token = localStorage.getItem('token');
//     if (token != undefined || token != null) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('permissions');
//       this.loginStatusUpdate$.next(false);
//       this.router.navigate(['/auth/login']);
//     }
//   }

//   hasPermission(permissionName: string): boolean {
//     const storedPermissionsString = localStorage.getItem('permissions'); // ابتدا رشته را از localStorage بگیرید

//     if (!storedPermissionsString) {
//       // اگر چیزی در localStorage نیست، یعنی پرمیشنی نداریم
//       return false;
//     }

//     try {
//       const permissions: Permission[] = JSON.parse(storedPermissionsString); // سپس رشته را parse کنید
//       console.log('Permissions loaded from storage:', permissions); // برای دیباگ

//       var hasPermission = permissions.filter((x) => x.name == permissionName);
//       console.log(hasPermission);
//       return hasPermission.length > 0;

//       // چک کنید پرمیشن وجود دارد یا خیر
//     } catch (e) {
//       console.error('Error parsing permissions from local storage:', e);
//       // در صورت خطا در parsing، فرض می‌کنیم پرمیشن‌ها نامعتبرند

//       return false;
//     }
//   }
// }

// // src/app/shared/models/permission.model.ts (مثلاً)
// export interface Permission {
//   id: number;
//   name: string;
//   title: string;
//   // هر فیلد دیگری که پرمیشن شما ممکن است داشته باشد
// }

// auth.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Login } from '../models/login.model';
import { NotifService } from '../../../shared/services/notif.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs'; // مطمئن شوید Observable از 'rxjs' ایمپورت شده است
import { jwtDecode } from 'jwt-decode';
// import { Observable } from 'tinymce'; // این خط را حذف کنید

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  Url = environment.ApiEndPoint;
  constructor(
    private http: HttpClient,
    private notif: NotifService,
    private router: Router
  ) {}

  loginStatusUpdate$ = new BehaviorSubject<boolean>(false);

  saveIntegration(data: Login) {
    return this.http.post(`${this.Url}IntegrationLoginData/save`, data);
  }

  login(data: Login) {
    return this.http.post(`${this.Url}auth/login`, data);
  }

  getUserPermission() {
    return this.http.get(`${this.Url}permission/getAllByToken`);
  }

  isLoggedIn(): boolean {
    debugger
    const token = localStorage.getItem('token');
    if (token == undefined || token == null) {
      this.loginStatusUpdate$.next(false);
      this.logout();
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      var isValid = decoded.exp > Date.now() / 1000;
      if (!isValid) {
        this.loginStatusUpdate$.next(false);
        this.logout();
        this.router.navigate(['/auth/login']);
        return isValid;
      } else {
        this.loginStatusUpdate$.next(true);
        return isValid;
      }
    } catch {
      this.notif.error('لطفا وارد حساب کاربری خود شوید');
      this.loginStatusUpdate$.next(false);
      return false;
    }
  }

  // این متد برای expose کردن Observable به بیرون است
  loginStatus$(): Observable<boolean> {
    return this.loginStatusUpdate$.asObservable();
  }

  logout() {
    const token = localStorage.getItem('token');
    if (token != undefined || token != null) {
      localStorage.removeItem('token');
      localStorage.removeItem('permissions');
      this.loginStatusUpdate$.next(false);
      this.router.navigate(['/auth/login']);
    }
  }

  hasPermission(permissionName: string): boolean {
    const storedPermissionsString = localStorage.getItem('permissions');

    if (!storedPermissionsString) {
      return false;
    }

    try {
      const permissions: Permission[] = JSON.parse(storedPermissionsString);
      console.log('Permissions loaded from storage:', permissions);

      var hasPermission = permissions.filter((x) => x.name == permissionName);
      console.log(hasPermission);
      return hasPermission.length > 0;
    } catch (e) {
      console.error('Error parsing permissions from local storage:', e);
      return false;
    }
  }
}

export interface Permission {
  id: number;
  name: string;
  title: string;
}
