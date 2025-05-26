import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { NewsSave } from '../models/newsSave.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewsDetail } from '../models/newsDetail.model';
import { ParentChild } from '../../../models/ParentChild.model';

@Injectable({
  providedIn: 'root',
})
export class AdminNewsService {
  Url = environment.ApiEndPoint;
  editingNews$ = new BehaviorSubject<number | null>(null);
  constructor(private http: HttpClient) {}

  save(body: NewsSave) {
    return this.http.post(`${this.Url}news/save`, body);
  }

  get(id: number): Observable<NewsDetail> {
    return this.http.get<NewsDetail>(`${this.Url}news/Get/${id}`);
  }

  GetProvinceByStoryId(id: number): Observable<ParentChild> {
    return this.http.get<ParentChild>(
      `${this.Url}news/GetProvinceBynewsId/${id}`
    );
  }
  GetNewsCategoryByNewsId(id: number): Observable<ParentChild> {
    return this.http.get<ParentChild>(
      `${this.Url}news/GetNewsCategoryBynewsId/${id}`
    );
  }
}
