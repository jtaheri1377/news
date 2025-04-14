import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorySave } from '../models/storySave.model';

@Injectable({
  providedIn: 'root'
})
export class AdminStoryService {
 Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  
    save(body:StorySave) {
      return this.http.post(`${this.Url}story/save`,body);
    }
}
