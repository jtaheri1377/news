import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { RoleSave } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleService {
  Url = environment.ApiEndPoint;
  RoleListUpdate$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.Url}role/GetAll`);
  }

  get(id: number) {
    return this.http.get(`${this.Url}role/Get/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.Url}role/${id}`);
  }

  save(body: RoleSave) {
    return this.http.post(`${this.Url}role/save`, body);
  }
}
