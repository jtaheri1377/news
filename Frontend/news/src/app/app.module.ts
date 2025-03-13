import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutModule } from './layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    FontAwesomeModule,
    SharedModule,
    EditorModule,
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
