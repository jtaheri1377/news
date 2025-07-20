import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorySave } from '../models/storySave.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Story } from '../../../../core/models/story/story.model';
import { ParentChild } from '../../../models/ParentChild.model';

@Injectable({
  providedIn: 'root',
})
export class AdminStoryService {
  editingStory$ = new BehaviorSubject<Story | null>(null);
  Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  save(body: StorySave) {
    return this.http.post(`${this.Url}story/save`, body);
  }

  delete(id: number) {
    return this.http.delete(`${this.Url}story/${id}`);
  }

  GetProvinceByStoryId(id: number): Observable<ParentChild> {
    return this.http.get<ParentChild>(
      `${this.Url}story/GetProvinceByStoryId/${id}`
    );
  }
}
