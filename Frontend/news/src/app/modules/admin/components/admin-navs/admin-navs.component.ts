import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-navs',
  standalone: false,

  templateUrl: './admin-navs.component.html',
  styleUrl: './admin-navs.component.scss'
})
export class AdminNavsComponent {
 route: any;
  selectedItem: string = '';


  navs = [
    {
      name: 'story',
      title: 'استوری',
      icon: 'fa-home',
    },
    {
      name: 'news',
      title: 'اخبار',
      icon: 'fa-map',
    },
    {
      name: 'banner',
      title: 'بنر ',
      icon: 'fa-users',
    },
    {
      name: 'wise',
      title: 'فرزانگان',
      icon: 'fa-medal',
    },
    {
      name: 'file',
      title: 'فایل',
      icon: 'fa-file',
    },

    {
      name: 'province',
      title: 'استان ها',
      icon: 'fa-location-pin',
    },

  ];

  constructor( private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        // Get your url
        this.selectedItem = routerEvent.url;
      }
    });
  }

  goTo(route: string[]) {
    this.router.navigate(route);
  }
}
