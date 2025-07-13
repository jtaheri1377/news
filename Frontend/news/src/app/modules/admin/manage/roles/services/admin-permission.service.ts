import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { RoleSave } from '../models/role.model';
import { TreeNode } from '../../../province/models/treeNode.model';
import { PermissionNode } from '../models/permissionNode.model';

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionService{ 
  Url = environment.ApiEndPoint;
  PermissionListUpdate$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.Url}permission/GetAll`);
  }

  get(id: number) {
    return this.http.get(`${this.Url}permission/Get/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.Url}permission/${id}`);
  }

  save(body: RoleSave) {
    return this.http.post(`${this.Url}permission/save`, body);
  }


 getTree(): Observable<PermissionNode[]> {
    return this.http.get<PermissionNode[]>(`${this.Url}permission/GetTree`);
  }

  ProvincesUpdate$: BehaviorSubject<PermissionNode | null> = new BehaviorSubject<PermissionNode | null>(
    null
  );

    

}
