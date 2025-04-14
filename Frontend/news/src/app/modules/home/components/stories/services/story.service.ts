import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Story } from '../../../../../core/models/story/story.model';
import { Media } from '../../../../../core/models/media/media.model';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  showStory = new BehaviorSubject<Story|null >(null);
Url = environment.ApiEndPoint;

  constructor(private http:HttpClient) {}
  getAll(): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.Url}story/GetAll`);
  }
}
