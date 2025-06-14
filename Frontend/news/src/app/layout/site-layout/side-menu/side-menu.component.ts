import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DrawerPusherService } from '../../services/drawer-pusher.service';

@Component({
  selector: 'app-side-menu',
  standalone: false,

  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent implements OnInit {
  route: any;
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
    {
      name: 'messenger',
      title: 'اتوماسیون',
      icon: 'fa-sms',
    },
    {
      name: 'admin',
      title: 'مدیریت سامانه',
      icon: 'fa-gear',
    },
  ];

  constructor(private drawer: DrawerPusherService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        // Get your url
        this.route = routerEvent.url;
      }
    });
  }

  goTo(route: string[]) {
    this.router.navigate(route);
    this.drawer.toggleDrawer.next();
  }
}
