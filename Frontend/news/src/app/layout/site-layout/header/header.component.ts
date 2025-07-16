import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DrawerPusherService } from '../../services/drawer-pusher.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { map, Subscription, switchMap, tap } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChoosePlaceComponent } from '../components/choose-place/choose-place.component';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { Router } from '@angular/router';

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
  profile!: UserProfile;
  subs: Subscription[] = [];
  isLoggedIn: boolean = false;
  ShowSearchInput: boolean = false;
  constructor(
    private drawer: DrawerPusherService,
    private service: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  toggleDrawer() {
    this.drawer.toggleDrawer.next();
  }

  ngOnInit(): void {
    this.getProvince();

    var sub = this.service.loginStatus$().subscribe((res: boolean) => {
      this.isLoggedIn = res;
      this.getProfile();
    });
    this.subs.push(sub);

    var sub1 = this.drawer.provinceUpdate$.subscribe((res: any) => {
      this.getProvince();
    });
    this.subs.push(sub1);
    // this.cdr.markForCheck();
  }

  getProfile() {
    var sub = this.service.getCurrent().subscribe((response: any) => {
      this.profile = {
        id: response.id,
        name: response.name,
        family: response.family,
        username: response.username,
        roles: response.roles,
      };
    });
    this.subs.push(sub);
  }

  openChangePasswordPanel() {
    let config: MatDialogConfig = new MatDialogConfig();
    // config.disableClose = true;
    // if (!isEditMode && item!.id != 0) {
    //   config.data.parentId = item!.id;
    // }
    // }
    var dialogRes = this.dialog.open(ChangePasswordComponent, config);
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

interface UserProfile {
  id: number;
  name: string;
  family: string;
  username: string;
  roles: string[];
}
