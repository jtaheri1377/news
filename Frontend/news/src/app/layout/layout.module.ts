import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HeaderComponent } from './site-layout/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MainComponent } from './site-layout/main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './site-layout/sidebar/sidebar.component';
import { MobileNavPannelComponent } from './site-layout/mobile-nav-pannel/mobile-nav-pannel.component';
import { SideMenuComponent } from './site-layout/side-menu/side-menu.component';
import { ChoosePlaceComponent } from './site-layout/components/choose-place/choose-place.component';
import { SocialMediaComponent } from './site-layout/components/social-media/social-media.component';
@NgModule({
  declarations: [
    SiteLayoutComponent,
    HeaderComponent,
     MainComponent,
    SidebarComponent,
    MobileNavPannelComponent,
    SideMenuComponent,
    ChoosePlaceComponent,
    SocialMediaComponent,
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
