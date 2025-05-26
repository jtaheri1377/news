import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { SiteFileSave } from '../models/siteFileSave.model';

@Injectable({
  providedIn: 'root'
})
export class AdminSiteFileService {
  Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}
 
  
  
  save(body:SiteFileSave) {
    return this.http.post(`${this.Url}siteFile/save`,body);
  }
}
