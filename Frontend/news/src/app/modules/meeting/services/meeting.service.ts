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

  getNews(
    categoryCode: number,
    skip: number = 0,
    take: number = 10,
    provinceId: number = 0
  ): Observable<LazyLoadResponse<NewsItem>> {
    var provinceField = provinceId == 0 ? '' : `&provinceId=${provinceId}`;
    return this.http.get<LazyLoadResponse<NewsItem>>(
      `${this.Url}News/GetByCategoryCode?categoryCode=${categoryCode}&skip=${skip}&take=${take}` +
        provinceField
    );
  }
}
