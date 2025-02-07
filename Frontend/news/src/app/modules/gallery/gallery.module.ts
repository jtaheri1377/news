import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { ImageItemComponent } from './components/image-item/image-item.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    GalleryComponent,
    ImageItemComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule
  ]
})
export class GalleryModule { }
