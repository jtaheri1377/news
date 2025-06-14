import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerPusherService } from '../../services/drawer-pusher.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchValue: string = '';
  subs: Subscription[] = [];
  isLoggedIn: boolean = false;
  ShowSearchInput: boolean = false;
  constructor(
    private drawer: DrawerPusherService,
    private service: AuthService,
    private cdr:ChangeDetectorRef
  ) {}

  toggleDrawer() {
    this.drawer.toggleDrawer.next();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.service.isLoggedIn();
    var sub = this.service.loginStatus$.subscribe((res: any) => {
      debugger
      console.log('ورود یا خروج')
      this.isLoggedIn = res;
    });
    this.subs.push(sub);
  this.cdr.markForCheck()
  }

  logout() {
    this.service.logout();
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
