import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BannerSave } from '../models/BannerSave.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminBannerService {
 Url = environment.ApiEndPoint;
   updatedBanner$ = new BehaviorSubject<void | null>(null);

  constructor(private http: HttpClient) {}



  save(body:BannerSave) {
    return this.http.post(`${this.Url}banner/save`,body);
  }

   getByCategoryCode(Code:number) {
    return this.http.get(`${this.Url}banner/get/${Code}`);
  }

   delete(id:number) {
    return this.http.delete(`${this.Url}banner/${id}`);
  }
}
