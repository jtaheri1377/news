import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rule } from '../model/rule.model';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
 Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  get():Observable<Rule> {
    return this.http.get<Rule>(
      `${this.Url}siteFile/Get/0`
    );
  }
}
