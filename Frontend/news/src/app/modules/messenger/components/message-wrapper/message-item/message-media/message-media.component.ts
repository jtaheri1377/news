import { Component, Input } from '@angular/core';
import {
  FileUpload,
  UploadService,
} from '../../../../file-browser/services/upload.service';

@Component({
  selector: 'app-message-media',
  standalone: false,

  templateUrl: './message-media.component.html',
  styleUrl: './message-media.component.scss',
})
export class MessageMediaComponent {
  @Input() files: FileUpload[] = [];

  constructor(private uploadService: UploadService) {
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
}
