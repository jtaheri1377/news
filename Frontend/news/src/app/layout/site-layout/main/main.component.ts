import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DrawerPusherService } from '../../services/drawer-pusher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: false,

  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('drawerElement', { static: false }) drawerElement!: any;
  subs: Subscription[] = [];

  constructor(private drawer: DrawerPusherService) {}

  ngOnInit(): void {
    var sb1 = this.drawer.toggleDrawer.subscribe((res) => {
      this.drawerElement.toggle();
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
