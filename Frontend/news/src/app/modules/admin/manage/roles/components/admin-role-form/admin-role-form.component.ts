import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Role, RoleSave } from '../../models/role.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifService } from '../../../../../../shared/services/notif.service';
import { AdminRoleService } from '../../services/admin-role.service';

@Component({
  selector: 'app-admin-role-form',
  standalone: false,

  templateUrl: './admin-role-form.component.html',
  styleUrl: './admin-role-form.component.scss',
})
export class AdminRoleFormComponent implements OnInit, OnDestroy {
  myForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    permissionIds: new FormControl<number[]>([]),
    provinceIds: new FormControl<number[]>([]),
    id: new FormControl<number>(0),
  });
  isEditMode: boolean = false;
  isLoading: boolean = false;
  subs: Subscription[] = [];
  selectedPermissionIds: number[] = [];
  selectedProvinceIds: number[] = [];
  roles: Role[] = [];

  readonly dialogRef = inject(MatDialogRef<AdminRoleFormComponent>);
  readonly data = inject<{
    isEditMode: boolean;
    id: number;
    name: string;
    title: string;
    permissionIds: number[];
    provinceIds: number[];
  }>(MAT_DIALOG_DATA);
  readonly notif = inject(NotifService);

  constructor(
    private service: AdminRoleService,
    private roleService: AdminRoleService
  ) {}

  // message = model();

  ngOnInit(): void {
    // this.initForm$();
    this.data.isEditMode;
    // ;
    if (this.data.id != 0) this.getSavedRole();
  }

  // initForm$() {
  //   this.isLoading = true;
  //   var sub = this.roleService.getAll().subscribe((res: any) => {
  //     this.roles = res;
  //     this.isLoading = false;
  //   });
  //   this.subs.push(sub);
  // }

  getSavedRole() {
    ;
    this.myForm.get('id')?.patchValue(this.data.id);
    this.myForm.get('name')?.patchValue(this.data.name);
    this.myForm.get('permissionIds')?.patchValue(this.data.permissionIds);
    this.selectedPermissionIds = this.data.permissionIds;
    // this.isLoading = true;
    this.myForm.get('provinceIds')?.patchValue(this.data.provinceIds);
    this.selectedProvinceIds = this.data.provinceIds;
    // this.isLoading = true;
    // var sub = this.service.get(id).subscribe((res: any) => {

    //   this.isLoading = false;
    // });
    // this.subs.push(sub);
  }

  getPermissionIds(selectedIds: number[]) {
    this.myForm.get('permissionIds')?.patchValue(selectedIds);
    console.log('ids:        ', this.myForm.value.permissionIds);
  }

  getProvinceIds(selectedIds: number[]) {
    this.myForm.get('provinceIds')?.patchValue(selectedIds);
    console.log('ids:        ', this.myForm.value.provinceIds);
  }

  // setPermissionToTree(){
  // }

  save() {
    if (this.myForm.invalid) {
      this.notif.warn('تمام موارد ستاره دار در فرم باید وارد شود!');
      return;
    }

    var data: RoleSave = {
      id: this.myForm.value.id ?? 0,
      name: this.myForm.value.name!,
      permissionIds: this.myForm.value.permissionIds!,
      provinceIds: this.myForm.value.provinceIds!,
      // family: this.myForm.value.family!,
      // email: this.myForm.value.email!,
      // isActive: this.myForm.value.isActive ? true : false,
      // nationalCode: this.myForm.value.nationalCode!.toString(),
      // phone1: (this.myForm.value.phone1)?.toString()??'',
      // phone2: (this.myForm.value.phone2)?.toString()??'',
      // socialMedia1: this.myForm.value.socialMedia1!,
      // socialMedia2: this.myForm.value.socialMedia1!,
      // address: this.myForm.value.address!,
      // roleIds: this.myForm.value.roleIds!,

      // password: (this.myForm.value.password)?.toString()??'',
    };

    if (!this.isEditMode) {
      // Add user
      var sub = this.service.save(data).subscribe((res) => {
        this.notif.success('نقش با موفقیت ذخیره شد');
        this.service.RoleListUpdate$.next(true);
        this.myForm.reset();
        this.dialogRef.close({});
      });
      this.subs.push(sub);
    } else {
      // Edit user
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
