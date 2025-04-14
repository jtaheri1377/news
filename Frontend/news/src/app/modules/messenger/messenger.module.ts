import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerComponent } from './messenger.component';
import { MessageWrapperComponent } from './components/message-wrapper/message-wrapper.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MSideBarComponent } from './components/m-layout/m-side-bar/m-side-bar.component';
import { MFooterComponent } from './components/m-layout/m-footer/m-footer.component';
import { MHeaderComponent } from './components/m-layout/m-header/m-header.component';
import { MMainComponent } from './components/m-layout/m-main/m-main.component';
import { MLayoutComponent } from './components/m-layout/m-layout.component';
import { MContactItemComponent } from './components/m-contact-item/m-contact-item.component';
import { MessageItemComponent } from './components/message-wrapper/message-item/message-item.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { SharedModule } from '../../shared/shared.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { FileUploadPreviewComponent } from './file-browser/components/file-upload-preview/file-upload-preview.component';
import {CdkMenuModule} from '@angular/cdk/menu';
import { MessageMediaComponent } from './components/message-wrapper/message-item/message-media/message-media.component';
@NgModule({
  declarations: [
    MessengerComponent,
    MessageWrapperComponent,
    MSideBarComponent,
    MFooterComponent,
    MHeaderComponent,
    MMainComponent,
    MLayoutComponent,
    MContactItemComponent,
    MessageItemComponent,
    MessageInputComponent,
    FileBrowserComponent,
    FileUploadPreviewComponent,
    MessageMediaComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MessengerRoutingModule,
    SharedModule,
    PickerModule,
    CdkMenuModule,
  ],
  exports:[
    FileBrowserComponent,
    FileUploadPreviewComponent,
    MessageMediaComponent

  ]
})
export class MessengerModule { }
