import { Component, inject, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifService } from '../../../../../../shared/services/notif.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserSave } from '../../models/user.model';
import { AdminUserService } from '../../services/admin-user.service';
import { Subscription } from 'rxjs';
import { AdminRoleService } from '../../../roles/services/admin-role.service';
import { Role } from '../../../roles/models/role.model';

@Component({
  selector: 'app-admin-user-form',
  standalone: false,

  templateUrl: './admin-user-form.component.html',
  styleUrl: './admin-user-form.component.scss',
})
export class AdminUserFormComponent implements OnInit, OnDestroy {
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

  readonly dialogRef = inject(MatDialogRef<AdminUserFormComponent>);
  readonly data = inject<{
    isEditMode: boolean;
    id: number;
  }>(MAT_DIALOG_DATA);
  readonly notif = inject(NotifService);

  constructor(
    private service: AdminUserService,
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

    var data: UserSave = {
      id: this.myForm.value.id ?? 0,
      name: this.myForm.value.name!,
      family: this.myForm.value.family!,
      email: this.myForm.value.email!,
      isActive: this.myForm.value.isActive ? true : false,
      nationalCode: this.myForm.value.nationalCode!.toString(),
      phone1: (this.myForm.value.phone1)?.toString()??'',
      phone2: (this.myForm.value.phone2)?.toString()??'',
      socialMedia1: this.myForm.value.socialMedia1!,
      socialMedia2: this.myForm.value.socialMedia1!,
      address: this.myForm.value.address!,
      roleIds: this.myForm.value.roleIds!,

      password: (this.myForm.value.password)?.toString()??'',
    };

    if (!this.isEditMode) {
      // Add user
      var sub = this.service.save(data).subscribe((res) => {
        this.notif.success('کاربر با موفقیت ذخیره شد');
        this.service.UserListUpdate$.next(true);
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
