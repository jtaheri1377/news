import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Meeting } from '../../../core/models/meeting/meeting.model';
import { NewsResponse } from '../../../core/models/News/news.model';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  getNews(categoryId:number,skip:number=0,take:number=10): Observable<NewsResponse> {
   return this.http.get<NewsResponse>(`${this.Url}News/GetByCategoryId?categoryId=${categoryId}&skip=${skip}&take=${take}`);
  }
}
