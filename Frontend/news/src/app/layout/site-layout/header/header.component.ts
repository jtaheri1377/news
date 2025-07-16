import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DrawerPusherService } from '../../services/drawer-pusher.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChoosePlaceComponent } from '../components/choose-place/choose-place.component';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchValue: string = '';
  province: string = '';
  subs: Subscription[] = [];
  isLoggedIn: boolean = false;
  ShowSearchInput: boolean = false;
  constructor(
    private drawer: DrawerPusherService,
    private service: AuthService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  toggleDrawer() {
    this.drawer.toggleDrawer.next();
  }

  ngOnInit(): void {
    this.getProvince();
    // this.isLoggedIn = this.service.isLoggedIn();
    var sub = this.service.loginStatus$().subscribe((res: any) => {
      this.isLoggedIn = res;
      this.cdr.detectChanges();

    });
    var sub1 = this.drawer.provinceUpdate$.subscribe((res: any) => {
      this.getProvince();
        this.cdr.detectChanges();
    });
    this.subs.push(sub);
    this.subs.push(sub1);
    // this.cdr.markForCheck();
  }

  getProvince() {
    var result = JSON.parse(localStorage.getItem('province')!);
    this.province = result ? result.name ?? '' : '';
    return result;
  }

  openProvinces() {
    let config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      // isEditMode: isEditMode,
      province: this.getProvince(),
      // parent: item!.parent,
      // name: item!.name,
      // parentId: item!.parentId ?? null,
    };
    // if (!isEditMode && item!.id != 0) {
    //   config.data.parentId = item!.id;
    // }
    // }
    var dialogRes = this.dialog.open(ChoosePlaceComponent, config);
    // var dialogRes = this.dialog.open(SaveSubjectComponent, config);
  }

  logout() {
    this.service.logout();
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
