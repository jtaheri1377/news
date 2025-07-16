import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-nav-headers',
  standalone: false,

  templateUrl: './nav-headers.component.html',
  styleUrl: './nav-headers.component.scss',
})
export class NavHeadersComponent implements OnInit {
  subs: Subscription[] = [];
  isLoggedIn: boolean = false;
  route: string = '';
  constructor(private router: Router, private service: AuthService) {}

  navs: any[] = [];
  //   {
  //     name: '',
  //     title: 'خانه',
  //     icon: 'fa-home',
  //   },
  //   {
  //     name: 'commissions',
  //     title: 'کمیسیون ها',
  //     icon: 'fa-network-wired',
  //   },
  //   //  {
  //   //   name: 'provinces',
  //   //   title: 'اخبار استان ها ',
  //   //   icon: 'fa-map',
  //   // },
  //   {
  //     name: 'jalasat',
  //     title: 'جلسات ',
  //     icon: 'fa-chair',
  //   },
  //   {
  //     name: 'interviews',
  //     title: 'مصاحبه ها',
  //     icon: 'fa-camera-retro',
  //   },

  //   {
  //     name: 'wises',
  //     title: 'فرزانگان',
  //     icon: 'fa-medal',
  //   },

  //   {
  //     name: 'gallery',
  //     title: 'گالری',
  //     icon: 'fa-photo-film',
  //   },
  //   {
  //     name: 'rules',
  //     title: 'قوانین و مقررات',
  //     icon: 'fa-gavel',
  //   },
  //   {
  //     name: 'contactUs',
  //     title: 'ارتباط با ما',
  //     icon: 'fa-headset',
  //   },
  // ];

  ngOnInit() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.route = routerEvent.url.split('/')[1];
      }
    });
    this.onLogin();
    // var sub = this.service.loginStatus$().subscribe((res: any) => {
    //   this.isLoggedIn = res;
    //   this.onLogin();
    // });
    // this.subs.push(sub);
  }

  onLogin() {
    this.isLoggedIn = this.service.isLoggedIn();
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

  navigateTo(url: string[]) {
    this.router.navigate(url);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
