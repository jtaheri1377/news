import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Province } from '../../../../core/models/province/province.model';
import { Observable } from 'rxjs';
import { newsSave } from '../models/newsSave.model';

@Injectable({
  providedIn: 'root',
})
export class AdminNewsService {
  Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}
 
  
  
  save(body:newsSave) {
    return this.http.post(`${this.Url}news/save`,body);
  }

  
}
