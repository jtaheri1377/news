import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  showStory = new BehaviorSubject<boolean>(false);

  constructor() {}
}
