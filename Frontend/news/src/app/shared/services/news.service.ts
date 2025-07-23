import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LazyLoadResponse } from '../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { NewsItem } from '../../core/models/News/newsItem.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}


  get<T>(id: number): Observable<T> {
    return this.http.get<T>(`${this.Url}news/Get/${id}`);
  }

  getNews(categoryCode:number,skip:number=0,take:number=10): Observable<LazyLoadResponse<NewsItem>> {
     return this.http.get<LazyLoadResponse<NewsItem>>(`${this.Url}News/GetByCategoryCode?categoryCode=${categoryCode}&skip=${skip}&take=${take}`);
    }




}
