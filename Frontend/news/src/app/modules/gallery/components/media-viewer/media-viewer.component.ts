import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Gallery } from '../../../../core/models/gallery/gallery.model';
import { Media } from '../../../../core/models/media/media.model';

@Component({
  selector: 'app-media-viewer',
  standalone: false,

  templateUrl: './media-viewer.component.html',
  styleUrl: './media-viewer.component.scss',
})
export class MediaViewerComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<MediaViewerComponent>);
  readonly data = inject<Gallery>(MAT_DIALOG_DATA);
  readonly item = signal(this.data);
  readonly selectedMedia = model<Media>(this.item().medias[0]);
  

  ngOnInit(): void {
    console.log(this.item());
  }

  

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
