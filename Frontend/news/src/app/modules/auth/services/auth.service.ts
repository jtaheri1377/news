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
      this.loginStatus$.next(false);
      this.router.navigate(['/auth/login']);
    }
  }
}
