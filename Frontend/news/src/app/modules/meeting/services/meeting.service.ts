import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Meeting } from '../../../core/models/meeting/meeting.model';
import { LazyLoadResponse } from '../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { NewsItem } from '../../../core/models/News/newsItem.model';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  getNews(categoryId:number,skip:number=0,take:number=10): Observable<LazyLoadResponse<NewsItem>> {
   return this.http.get<LazyLoadResponse<NewsItem>>(`${this.Url}News/GetByCategoryId?categoryId=${categoryId}&skip=${skip}&take=${take}`);
  }
}
