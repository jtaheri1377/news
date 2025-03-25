import { Component } from '@angular/core';
import { MDrawerPusherService } from '../../../services/m-drawer-pusher.service';

@Component({
  selector: 'app-m-header',
  standalone: false,
  
  templateUrl: './m-header.component.html',
  styleUrl: './m-header.component.scss'
})
export class MHeaderComponent {
  constructor(private drawer: MDrawerPusherService) {}

  toggleDrawer() {
    this.drawer.toggleDrawer.next();
  }
}
