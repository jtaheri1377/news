import { Component, Input, model } from '@angular/core';
import { Media } from '../../../../../core/models/media/media.model';

@Component({
  selector: 'app-all-medias',
  standalone: false,

  templateUrl: './all-medias.component.html',
  styleUrl: './all-medias.component.scss',
})
export class AllMediasComponent {
  readonly medias = model<Media[]>();
  readonly selectedMedia = model<Media | null>(null);

  selectMedia(media: Media) {
    this.selectedMedia.set(media);

    console.log(this.selectedMedia());
  }
}
