import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserSave } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
 Url = environment.ApiEndPoint;
  // UserListUpdate$ = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }

 getAll()  {
    return this.http.get(`${this.Url}user/GetAll`);
  }
 get(id:number)  {
    return this.http.get(`${this.Url}user/Get/${id}`);
  }

   save(body: UserSave) {
    return this.http.post(`${this.Url}user/save`, body);
  }
}
