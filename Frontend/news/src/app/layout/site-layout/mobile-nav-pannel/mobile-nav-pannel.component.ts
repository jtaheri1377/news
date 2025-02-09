import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-mobile-nav-pannel',
  standalone: false,

  templateUrl: './mobile-nav-pannel.component.html',
  styleUrl: './mobile-nav-pannel.component.scss',
})
export class MobileNavPannelComponent {
  selectedItem: string = '';
  constructor(private router: Router) {}

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
