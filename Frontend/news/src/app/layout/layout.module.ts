import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HeaderComponent } from './site-layout/header/header.component';
import { FooterComponent } from './site-layout/footer/footer.component';
import { MainComponent } from './site-layout/main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './site-layout/sidebar/sidebar.component';
import { MobileNavPannelComponent } from './site-layout/mobile-nav-pannel/mobile-nav-pannel.component';

@NgModule({
  declarations: [
    SiteLayoutComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SidebarComponent,
    MobileNavPannelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule, 
  ],
  exports: [SiteLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
