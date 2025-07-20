import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Story } from '../../../../../core/models/story/story.model';
import { StoryService } from '../../../../home/components/stories/services/story.service';
import { UploadService } from '../../../../messenger/file-browser/services/upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminStoryService } from '../../services/admin-story.service';
import { NotifService } from '../../../../../shared/services/notif.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-story-list',
  standalone: false,

  templateUrl: './story-list.component.html',
  styleUrl: './story-list.component.scss',
})
export class StoryListComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  stories: Story[] = [];
  constructor(
    private service: StoryService,
    private adminStory: AdminStoryService,
    private uploadService: UploadService,
    private router: Router,
    private dialog: MatDialog,
    private notif: NotifService,
    private route: ActivatedRoute
  ) {}

  goToEditPage(stroy: Story) {
    this.router.navigate(['save'], { relativeTo: this.route });
    this.adminStory.editingStory$.next(stroy);
  }

  ngOnInit(): void {
    const sub = this.adminStory.editingStory$.subscribe(() => {
      this.fetchStories();
    });

    this.subs.push(sub);
  }

  fetchStories() {
    const sub = this.service.getAll().subscribe((response: Story[]) => {
      console.log(response);
      this.stories = response;
    });

    this.subs.push(sub);
  }

  isImage(fileType: string) {
    return this.uploadService.isImage(fileType);
  }

  isVideo(fileType: string) {
    return this.uploadService.isVideo(fileType);
  }

  delete(id: number) {
    var dialogRes = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'حذف استوری',
        message: 'آیا از حذف استوری مورد نظر اطمینان دارید؟',
      },
    });
    dialogRes.afterClosed().subscribe((answer: any) => {
      if (answer)
        this.adminStory.delete(id).subscribe((res: any) => {
          this.notif.success('استوری مورد نظر حذف شد');
          this.adminStory.editingStory$.next(null);
        });
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
