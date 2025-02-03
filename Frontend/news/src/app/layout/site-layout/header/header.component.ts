import { Component } from '@angular/core';
import { DrawerPusherService } from '../../services/drawer-pusher.service';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchValue: string = '';
  constructor(private drawer: DrawerPusherService) {}

  toggleDrawer() {
    this.drawer.toggleDrawer.next();
  }
}
