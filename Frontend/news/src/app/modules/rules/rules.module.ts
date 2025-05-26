import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';


@NgModule({
  declarations: [
    RulesComponent,
    PdfViewerComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    RulesRoutingModule,
    NgxExtendedPdfViewerModule
  ],
})
export class RulesModule { }
