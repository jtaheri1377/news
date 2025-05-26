import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WiseSave } from '../models/wise.model';
import { BehaviorSubject } from 'rxjs';
import { Wise } from '../../../../core/models/wise/wise.model';

@Injectable({
  providedIn: 'root'
})
export class AdminWiseService {
  Url = environment.ApiEndPoint;
  editingWise$ = new BehaviorSubject<Wise | null>(null);
   constructor(private http: HttpClient) {}



  save(body:WiseSave) {
    return this.http.post(`${this.Url}wise/save`,body);
  }

}
