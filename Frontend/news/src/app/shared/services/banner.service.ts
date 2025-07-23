import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banner } from '../../core/models/banner/banner.model';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

 Url = environment.ApiEndPoint;
   constructor(private http: HttpClient) {}

  getBannerByCategoryCode(Code: number):Observable<Banner[]>{
    return this.http.get<Banner[]>(`${this.Url}banner/Get/${Code}`);

  }
}
