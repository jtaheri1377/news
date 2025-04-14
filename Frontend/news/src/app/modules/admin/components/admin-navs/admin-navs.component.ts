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
      name: 'slider',
      title: 'اسلایدر ',
      icon: 'fa-users',
    },
    {
      name: 'wise',
      title: 'فرزانگان',
      icon: 'fa-medal',
    },
    {
      name: 'rule',
      title: 'قوانین و مقررات',
      icon: 'fa-gavel',
    },

    {
      name: 'image',
      title: 'تصویر',
      icon: 'fa-photo-film',
    },
     
  ];

  constructor( private router: Router) {}

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
  }
}
