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
    family: new FormControl<string>('', Validators.required),
    phone1: new FormControl<string>('', Validators.required),
    phone2: new FormControl<string>(''),
    socialMedia1: new FormControl<string>('', Validators.required),
    socialMedia2: new FormControl<string>(''),
    address: new FormControl<string>(''),
    nationalCode: new FormControl<number | null>(null, Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    id: new FormControl<number | null>(null),
    password: new FormControl<number | null>(null),
    isActive: new FormControl<boolean | null>(null, Validators.required),
    roleIds: new FormControl<number[]>([], Validators.required),
  });
  isEditMode: boolean = false;
  isLoading: boolean = false;
  subs: Subscription[] = [];
  roles: Role[] = [];

  readonly dialogRef = inject(MatDialogRef<AdminRoleFormComponent>);
  readonly data = inject<{
    isEditMode: boolean;
    id: number;
  }>(MAT_DIALOG_DATA);
  readonly notif = inject(NotifService);

  constructor(
    private service: AdminRoleService,
    private roleService: AdminRoleService
  ) {}

  // message = model();

  ngOnInit(): void {
    this.initForm$();
    this.data.isEditMode;
    if (this.data.id != 0) this.getUser(this.data.id);
  }

  initForm$() {
    this.isLoading = true;
    var sub = this.roleService.getAll().subscribe((res: any) => {
      this.roles = res;
      this.isLoading = false;
    });
    this.subs.push(sub);
  }

  getUser(id: number) {
    this.isLoading = true;
    var sub = this.service.get(id).subscribe((res: any) => {
      this.myForm.get('id')?.patchValue(id);
      this.myForm.get('name')?.patchValue(res.name);
      this.myForm.get('family')?.patchValue(res.family);
      this.myForm.get('phone1')?.patchValue(res.phone1);
      this.myForm.get('phone2')?.patchValue(res.phone2!);
      this.myForm.get('socialMedia1')?.patchValue(res.socialMedia1);
      this.myForm.get('socialMedia2')?.patchValue(res.socialMedia2!);
      this.myForm.get('email')?.patchValue(res.email);
      this.myForm.get('nationalCode')?.patchValue(+res.nationalCode);
      this.myForm.get('roleIds')?.patchValue(res.roleIds);
      this.myForm.get('roleIds')?.patchValue(res.roleIds);
      this.myForm.get('isActive')?.patchValue(res.isActive);
      this.myForm.get('address')?.patchValue(res.address);

      this.isLoading = false;
    });
    this.subs.push(sub);
  }

  save() {
    if (this.myForm.invalid) {
      this.notif.warn('تمام موارد ستاره دار در فرم باید وارد شود!');
      return;
    }

    var data: RoleSave = {
      id: this.myForm.value.id ?? 0,
      name: this.myForm.value.name!,
      permissionIds: [],
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
