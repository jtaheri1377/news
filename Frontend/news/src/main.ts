import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { register as registerSwiperElement } from 'swiper/element/bundle';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authorizationInterceptor } from './app/core/interceptors/authorization.interceptor';


registerSwiperElement();

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
