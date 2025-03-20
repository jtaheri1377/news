import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { ImageItemComponent } from './components/image-item/image-item.component';
import { SharedModule } from '../../shared/shared.module';
import { MediaViewerComponent } from './components/media-viewer/media-viewer.component';
import { AllMediasComponent } from './components/media-viewer/all-medias/all-medias.component';
import { SmartVideoPlayerComponent } from './components/smart-video-player/smart-video-player.component';


@NgModule({
  declarations: [
    GalleryComponent,
    ImageItemComponent,
    MediaViewerComponent,
    AllMediasComponent,
    SmartVideoPlayerComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class GalleryModule { }
