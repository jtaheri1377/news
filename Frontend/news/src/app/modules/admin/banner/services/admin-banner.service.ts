import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BannerSave } from '../models/BannerSave.model';

@Injectable({
  providedIn: 'root'
})
export class AdminBannerService {
 Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}
 
  
  
  save(body:BannerSave) {
    return this.http.post(`${this.Url}banner/save`,body);
  }

}
