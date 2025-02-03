import { Component } from '@angular/core';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-story',
  standalone: false,

  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent {
  constructor(private story: StoryService) {}

  showStory() {
    this.story.showStory.next(true);
  }
}
