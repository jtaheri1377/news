import { Component, inject, Input, model } from '@angular/core';
import { FileUpload, UploadService } from '../../services/upload.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-preview',
  standalone: false,

  templateUrl: './file-upload-preview.component.html',
  styleUrl: './file-upload-preview.component.scss',
})
export class FileUploadPreviewComponent {
  readonly dialogRef = inject(MatDialogRef<FileUploadPreviewComponent>);
  readonly data = inject<{
    files: FileUpload[];
    message: string;
  }>(MAT_DIALOG_DATA);

  message = model();

  constructor(private service: UploadService) {
    this.message.set(this.data.message);
  }

  sendData() {
    this.dialogRef.close({ files: this.data.files, message: this.message() });
  }

  isImage(fileType: string): boolean {
    return this.service.isImage(fileType);
  }

  isVideo(fileType: string): boolean {
    return this.service.isVideo(fileType);
  }

  public isAudio(fileType: string): boolean {
    return this.service.isAudio(fileType);
  }

  isMedia(fileType: string): boolean {
    return this.service.isMedia(fileType);
  }
}
