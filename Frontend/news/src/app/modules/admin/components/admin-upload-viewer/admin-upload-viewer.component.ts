import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FileUploadFull,
  FileUploadResponse,
  UploadService,
} from '../../../messenger/file-browser/services/upload.service';
import { HttpEventType } from '@angular/common/http';
import { SavedMedia } from '../../story/models/sevedMedia.model';
import { AdminService } from '../../services/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-upload-viewer',
  standalone: false,

  templateUrl: './admin-upload-viewer.component.html',
  styleUrl: './admin-upload-viewer.component.scss',
})
export class AdminUploadViewerComponent implements OnInit {
  uploadedFiles: FileUploadResponse[] = [];
  subs: Subscription[] = [];
  @Input() files: FileUploadFull | null = null;
  @Input() enteredFiles: SavedMedia[] | null = [];
  @Input() enteredImage: string = '';
  @Output() Response = new EventEmitter<any[]>();

  uploadPercent: number = 0;

  constructor(
    private uploadService: UploadService,
    private service: AdminService
  ) {}
  ngOnInit(): void {
    this.clearItems();

    this.uploadFiles(this.files?.server!);
  }

  ngOnChanges(changes: SimpleChanges): void {
    var ss = this.enteredFiles;
    if (changes['files'] && !changes['files'].firstChange) {
      if (this.files?.server) {
        this.uploadFiles(this.files.server);
      }
    }
  }

  clearItems() {
    const sub = this.service.clearUploadViewer$.subscribe((allow: boolean) => {
      if (allow) {
        this.enteredFiles = [];
        this.files!.preview = [];
        this.files!.server = [];
      }
    });
    this.subs.push(sub);
  }

  removeItem(id: number, isFromEnteredFiles: boolean) {
    if (isFromEnteredFiles) {
      if (typeof this.enteredFiles != 'string') {
        const index = this.enteredFiles?.findIndex((x) => x.id == id);

        this.enteredFiles?.splice(index!, 1);
      } else {
      }
    } else {
      const index = this.uploadedFiles?.findIndex((x) => x.id == id);

      this.uploadedFiles?.splice(index!, 1);
    }
    const allFiles = [...this.enteredFiles!, ...this.uploadedFiles];
    this.Response.next(allFiles);
  }

  isImage(fileType: string): boolean {
    return this.uploadService.isImage(fileType);
  }

  isVideo(fileType: string): boolean {
    return this.uploadService.isVideo(fileType);
  }

  public isAudio(fileType: string): boolean {
    return this.uploadService.isAudio(fileType);
  }

  isMedia(fileType: string): boolean {
    return this.uploadService.isMedia(fileType);
  }

  uploadFiles(files: File[], uploadingImageCover: boolean = false) {
    if (!files || files.length == 0) return;

    console.log('شروع آپلود :  ', files);
    this.uploadService.uploadFiles(files).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(
            (100 * event.loaded) / (event.total ?? 1)
          );
          this.uploadPercent = percentDone;
        } else if (event.type === HttpEventType.Response) {
          const responseFiles = event.body as FileUploadResponse[];
          this.uploadedFiles = [...this.uploadedFiles, ...responseFiles];
          const allFiles = [...this.enteredFiles!, ...this.uploadedFiles];
          console.log('this.allFiles:', allFiles);
          this.Response.next(allFiles);
          this.files!.preview = [];
        }
      },
      (error: any) => {
        // this.hasMediaError();
        // this.notif.successToast('آپلود با مشکل مواجه شد',error);

        console.error('Upload failed:', error);
      }
    );
  }
}
