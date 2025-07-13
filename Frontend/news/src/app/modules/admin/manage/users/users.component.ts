import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminUserFormComponent } from './components/admin-user-form/admin-user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminUserService } from './services/admin-user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  users: User[] = [];

  constructor(private dialog: MatDialog, private service: AdminUserService) {}

  ngOnInit(): void {
    const sub = this.service.getAll().subscribe((response: any) => {
      console.log(response);
      this.users = response;
    });

    this.subs.push(sub);
  }

  addUser() {
    this.openUserDialog(false);
  }

  editUser(id: number) {
    this.openUserDialog(true,id);
  }

  openUserDialog(isEditMode: boolean, id:number=0) {
    const dialogRef = this.dialog.open(AdminUserFormComponent, {
      data: {
        isEditMode: isEditMode,
        id:id
      },
      disableClose: false,
      minWidth: '90vw',
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        alert('hello' + result);
        console.log(result);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
