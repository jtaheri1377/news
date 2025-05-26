import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from '../../../../../core/models/story/story.model';
import { StoryService } from '../../../../home/components/stories/services/story.service';
import { UploadService } from '../../../../messenger/file-browser/services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminStoryService } from '../../services/admin-story.service';

@Component({
  selector: 'app-story-list',
  standalone: false,

  templateUrl: './story-list.component.html',
  styleUrl: './story-list.component.scss'
})
export class StoryListComponent  implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  stories: Story[] = [];
  constructor(
    private service: StoryService,
    private adminStory:AdminStoryService,
    private uploadService: UploadService,
    private router:Router,
    private route:ActivatedRoute
  ) {}


  goToEditPage(stroy:Story) {
    this.router.navigate(['save'],{relativeTo:this.route})
    this.adminStory.editingStory$.next(stroy)
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
