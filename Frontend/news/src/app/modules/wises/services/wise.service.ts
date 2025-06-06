import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LazyLoadResponse } from '../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { Wise } from '../../../core/models/wise/wise.model';

@Injectable({
  providedIn: 'root',
})
export class WiseService {
  Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  get(id: number): Observable<Wise> {
    return this.http.get<Wise>(`${this.Url}wise/Get/${id}`);
  }

  getWises(
    skip: number = 0,
    take: number = 10
  ): Observable<LazyLoadResponse<Wise>> {
    return this.http.get<LazyLoadResponse<Wise>>(
      `${this.Url}wise/GetAll?skip=${skip}&take=${take}`
    );
  }
}
