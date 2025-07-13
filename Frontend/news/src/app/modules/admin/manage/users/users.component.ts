import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminUserFormComponent } from './components/admin-user-form/admin-user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminUserService } from './services/admin-user.service';
import { User } from './models/user.model';
import { NotifService } from '../../../../shared/services/notif.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Message } from '../../../messenger/models/message/message.model';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  users: User[] = [];

  constructor(
    private dialog: MatDialog,
    private notif: NotifService,
    private service: AdminUserService
  ) {}

  ngOnInit(): void {
    const sub = this.service.UserListUpdate$.subscribe(() => {
      this.fetchNews();
    });

    this.subs.push(sub);

    this.fetchNews();
  }

  fetchNews() {
    const sub1 = this.service.getAll().subscribe((response: any) => {
      this.users = response;
    });

    this.subs.push(sub1);
  }

  addUser() {
    this.openUserDialog(false);
  }

  editUser(id: number) {
    this.openUserDialog(true, id);
  }

  openUserDialog(isEditMode: boolean, id: number = 0) {
    const dialogRef = this.dialog.open(AdminUserFormComponent, {
      data: {
        isEditMode: isEditMode,
        id: id,
      },
      disableClose: false,
      minWidth: '90vw',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        console.log(result);
      }
    });
  }

  delete(id: number) {
    this.openConfirmDialog(id);
  }

  openConfirmDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'حذف کاربر',
        message: 'آیا از حذف کاربر مورد نظر اطمینان دارید ',
      },
      disableClose: false,
    });

    debugger;
    var sub2 = dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined && result !=false) {
        const sub1 = this.service.delete(id).subscribe((response: any) => {
          this.service.UserListUpdate$.next(true);
          this.notif.success('کاربر با موفقیت حذف شد');
        });
        this.subs.push(sub1);
      }
      this.subs.push(sub2);
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
