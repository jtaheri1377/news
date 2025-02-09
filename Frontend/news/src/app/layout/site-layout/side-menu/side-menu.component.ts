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
      icon: 'fa-bullhorn',
    },
    {
      name: 'provinces',
      title: 'اخبار استان ها ',
      icon: 'fa-location',
    },
    {
      name: 'meetings',
      title: 'جلسات ',
      icon: 'fa-person-dots-from-line',
    },
    {
      name: 'interviews',
      title: 'مصاحبه ها',
      icon: 'fa-hot-tub-person',
    },

    {
      name: 'units',
      title: 'کمیسیون ها',
      icon: 'fa-city',
    },
    {
      name: 'wises',
      title: 'فرزانگان',
      icon: 'fa-person-arrow-down-to-line',
    },
    {
      name: 'rules',
      title: 'قوانین و مقررات',
      icon: 'fa-hot-tub-person',
    },

    {
      name: 'gallery',
      title: 'گالری',
      icon: 'fa-city',
    },
    {
      name: 'contactUs',
      title: 'ارتباط با ما',
      icon: 'fa-person-arrow-down-to-line',
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
