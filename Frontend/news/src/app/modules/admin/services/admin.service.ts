import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Province } from '../../../core/models/province/province.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  getSubjects(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.Url}subject/GetAll`);
  }
  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.Url}province/GetProvinces`);
  }

  getCounties(id: number): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.Url}province/GetCounties/${id}`);
  }

  getNewsCategories(): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.Url}newsCategory/GetParents`);
  }
 
  getSubNewsCategories(id: number): Observable<Province[]> {
    return this.http.get<Province[]>(`${this.Url}newsCategory/GetChilds/${id}`);
  }
  
}
