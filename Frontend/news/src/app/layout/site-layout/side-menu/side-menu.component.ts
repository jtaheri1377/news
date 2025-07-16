import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DrawerPusherService } from '../../services/drawer-pusher.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  standalone: false,

  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  subs: Subscription[] = [];
  isLoggedIn: boolean = false;
  route: string = '';
  navs: any[] = [];
  // route: any;

  constructor(
    private drawer: DrawerPusherService,
    private router: Router,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        // Get your url
        this.route = routerEvent.url;
      }
    });

    var sub = this.service.loginStatus$().subscribe((res: any) => {
      this.isLoggedIn = res;
      this.onLogin();
    });
    this.subs.push(sub);
    // this.onLogin();
  }

  goTo(route: string[]) {
    this.router.navigate(route);
    this.drawer.toggleDrawer.next();
  }

  onLogin() {
    // this.isLoggedIn = this.service.isLoggedIn();
    if (this.isLoggedIn) {
      this.navs = [
        {
          name: '',
          title: 'خانه',
          icon: 'fa-home',
        },
        {
          name: 'commissions',
          title: 'کمیسیون ها',
          icon: 'fa-network-wired',
        },
        //  {
        //   name: 'provinces',
        //   title: 'اخبار استان ها ',
        //   icon: 'fa-map',
        // },
        {
          name: 'jalasat',
          title: 'جلسات ',
          icon: 'fa-chair',
        },
        {
          name: 'interviews',
          title: 'مصاحبه ها',
          icon: 'fa-camera-retro',
        },
        {
          name: 'gallery',
          title: 'گالری',
          icon: 'fa-photo-film',
        },
        {
          name: 'wises',
          title: 'فرزانگان',
          icon: 'fa-medal',
        },

        {
          name: 'rules',
          title: 'قوانین و مقررات',
          icon: 'fa-gavel',
        },
        {
          name: 'contactUs',
          title: 'ارتباط با ما',
          icon: 'fa-headset',
        },
        // {
        //   name: 'messenger',
        //   title: 'اتوماسیون',
        //   icon: 'fa-sms',
        // },
        {
          name: 'admin',
          title: 'مدیریت سامانه',
          icon: 'fa-gear',
        },
      ];
      // var messenger = {
      //   name: 'messenger',
      //   title: 'اتوماسیون',
      //   icon: 'fa-sms',
      // };
      // this.navs.push(messenger);
    } else {
      this.navs = [
        {
          name: '',
          title: 'خانه',
          icon: 'fa-home',
        },
        {
          name: 'commissions',
          title: 'کمیسیون ها',
          icon: 'fa-network-wired',
        },
        //  {
        //   name: 'provinces',
        //   title: 'اخبار استان ها ',
        //   icon: 'fa-map',
        // },
        {
          name: 'jalasat',
          title: 'جلسات ',
          icon: 'fa-chair',
        },
        {
          name: 'interviews',
          title: 'مصاحبه ها',
          icon: 'fa-camera-retro',
        },
        {
          name: 'gallery',
          title: 'گالری',
          icon: 'fa-photo-film',
        },

        {
          name: 'wises',
          title: 'فرزانگان',
          icon: 'fa-medal',
        },
        {
          name: 'rules',
          title: 'قوانین و مقررات',
          icon: 'fa-gavel',
        },

        {
          name: 'contactUs',
          title: 'ارتباط با ما',
          icon: 'fa-headset',
        },
      ];
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
