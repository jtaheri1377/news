import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MDrawerPusherService } from '../../../services/m-drawer-pusher.service';

@Component({
  selector: 'app-m-main',
  standalone: false,
  
  templateUrl: './m-main.component.html',
  styleUrl: './m-main.component.scss'
})
export class MMainComponent {
@ViewChild('drawerElement', { static: false })
  drawerElement: any | null = null;
  subs: Subscription[] = [];

  constructor(private drawer: MDrawerPusherService) {}

  ngOnInit(): void {
    var sb1 = this.drawer.toggleDrawer.subscribe((res) => {
      this.drawerElement?.toggle();
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}