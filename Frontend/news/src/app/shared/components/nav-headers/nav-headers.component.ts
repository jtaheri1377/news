import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-headers',
  standalone: false,

  templateUrl: './nav-headers.component.html',
  styleUrl: './nav-headers.component.scss',
})
export class NavHeadersComponent implements OnInit {
  constructor(private router: Router) {}
  route: string = '';

  navs = [
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
      name: 'gallery',
      title: 'گالری',
      icon: 'fa-photo-film',
    },
    {
      name: 'contactUs',
      title: 'ارتباط با ما',
      icon: 'fa-headset',
    },
    {
      name: 'messenger',
      title: 'اتوماسیون',
      icon: 'fa-sms',
    },
  ];

  ngOnInit() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.route = routerEvent.url.split('/')[1];
      }
    });
  }
  navigateTo(url: string[]) {
    this.router.navigate(url);
  }
}
