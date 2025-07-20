import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  Url = environment.ApiEndPoint;
  // editingNews$ = new BehaviorSubject<number | null>(null);
  // DeletedNews$ = new BehaviorSubject<void | null>(null);
  constructor(private http: HttpClient) {}

  // save(body: NewsSave) {
  //   return this.http.post(`${this.Url}news/save`, body);
  // }

  getRepresentatives(provinceId: number) {
    return this.http.get(`${this.Url}user/getRepresentative/${provinceId}`);
  }
}
