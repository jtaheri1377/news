import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  
  get<T>(id: number): Observable<T> {
    return this.http.get<T>(`${this.Url}news/Get/${id}`);
  }
  
}