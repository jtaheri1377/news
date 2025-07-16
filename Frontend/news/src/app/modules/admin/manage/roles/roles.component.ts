import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
// import { TreeNode } from '../../province/models/treeNode.model';
import { Subscription } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotifService } from '../../../../shared/services/notif.service';
import { AdminProvinceFormComponent } from '../../province/components/admin-province-form/admin-province-form.component';
import { AdminProvinceService } from '../../province/services/admin-province.service';
import { Role } from './models/role.model';
import { AdminRoleService } from './services/admin-role.service';
import { AdminRoleFormComponent } from './components/admin-role-form/admin-role-form.component';

@Component({
  selector: 'app-roles',
  standalone: false,

  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  users: Role[] = [];

  constructor(
    private dialog: MatDialog,
    private notif: NotifService,
    private service: AdminRoleService
  ) {}

  ngOnInit(): void {
    const sub = this.service.RoleListUpdate$.subscribe(() => {
      this.fetchRoles();
    });

    this.subs.push(sub);

    this.fetchRoles();
  }

  fetchRoles() {
    const sub1 = this.service.getAll().subscribe((response: any) => {
      this.users = response;
    });

    this.subs.push(sub1);
  }

  addRole() {
    this.openRoleDialog(false);
  }

  editRole(item: Role) {
    this.openRoleDialog(true, item);
  }

  openRoleDialog(isEditMode: boolean, item?: Role) {
    const dialogRef = this.dialog.open(AdminRoleFormComponent, {
      data: {
        isEditMode: isEditMode,
        id: item == undefined ? 0 : item.id,
        name: item == undefined ? 0 : item.name,
        permissionIds: item == undefined ? 0 : item.permissionIds,
        provinceIds: item == undefined ? 0 : item.provinceIds,
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
        title: 'حذف نقش',
        message: 'آیا از حذف نقش مورد نظر اطمینان دارید ',
      },
      disableClose: false,
    });

    debugger;
    var sub2 = dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined && result != false) {
        const sub1 = this.service.delete(id).subscribe((response: any) => {
          this.service.RoleListUpdate$.next(true);
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
