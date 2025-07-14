import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Login } from '../models/login.model';
import { NotifService } from '../../../shared/services/notif.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

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

  loginStatus$ = new BehaviorSubject<boolean | null>(false);

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
    const token = localStorage.getItem('token');
    if (token == undefined || token == null) {
      this.loginStatus$.next(false);
      this.logout();

      // this.router.navigate(['/auth/login']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      var isValid = decoded.exp > Date.now() / 1000;
      if (!isValid) {
        this.loginStatus$.next(false);
        this.logout();
        this.router.navigate(['/auth/login']);

        return isValid;
      } else {
        this.loginStatus$.next(true);
        return isValid;
      }
    } catch {
      this.notif.error('لطفا وارد حساب کاربری خود شوید');
      this.loginStatus$.next(false);
      return false;
    }
  }

  logout() {
    const token = localStorage.getItem('token');
    if (token != undefined || token != null) {
      localStorage.removeItem('token');
      localStorage.removeItem('permissions');
      this.loginStatus$.next(false);
      this.router.navigate(['/auth/login']);
    }
  }

  hasPermission(permissionName: string): boolean {
    const storedPermissionsString = localStorage.getItem('permissions'); // ابتدا رشته را از localStorage بگیرید

    if (!storedPermissionsString) {
      // اگر چیزی در localStorage نیست، یعنی پرمیشنی نداریم
      return false;
    }

    try {
      const permissions: Permission[] = JSON.parse(storedPermissionsString); // سپس رشته را parse کنید
      console.log('Permissions loaded from storage:', permissions); // برای دیباگ

      var hasPermission = permissions.filter((x) => x.name == permissionName);
      console.log(hasPermission);
      return hasPermission.length > 0;
      // چک کنید پرمیشن وجود دارد یا خیر
    } catch (e) {
      console.error('Error parsing permissions from local storage:', e);
      // در صورت خطا در parsing، فرض می‌کنیم پرمیشن‌ها نامعتبرند
      return false;
    }
  }
}

// src/app/shared/models/permission.model.ts (مثلاً)
export interface Permission {
  id: number;
  name: string;
  title: string;
  // هر فیلد دیگری که پرمیشن شما ممکن است داشته باشد
}
