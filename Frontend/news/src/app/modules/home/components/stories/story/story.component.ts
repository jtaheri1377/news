import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoryService } from '../services/story.service';
import { Subscription } from 'rxjs';
import { Story } from '../../../../../core/models/story/story.model';
import { UploadService } from '../../../../messenger/file-browser/services/upload.service';
import { Media } from '../../../../../core/models/media/media.model';

@Component({
  selector: 'app-story',
  standalone: false,

  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  stories: Story[] = [];
  constructor(
    private service: StoryService,
    private uploadService: UploadService
  ) {}


  showStory(stroy:Story) {
    this.service.showStory.next(stroy);
  }

  ngOnInit(): void {
    const sub = this.service.getAll().subscribe((response: Story[]) => {
      console.log(response);
      this.stories = response;
    });

    this.subs.push(sub);
  }

  isImage(fileType: string) {
    return this.uploadService.isImage(fileType)
  }

  isVideo(fileType: string) {
    return this.uploadService.isVideo(fileType)

  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
