import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Province } from '../../../core/models/province/province.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryItem } from '../../../core/models/newsCategory/news-category.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  Url = environment.ApiEndPoint;
  clearUploadViewer$ = new BehaviorSubject<boolean>(false);
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

  getNewsCategories(): Observable<CategoryItem[]> {
    return this.http.get<CategoryItem[]>(`${this.Url}newsCategory/GetParents`);
  }

  getSubNewsCategories(code: number): Observable<CategoryItem[]> {
    return this.http.get<CategoryItem[]>(`${this.Url}newsCategory/GetChildsByCode/${code}`);
  }
}
