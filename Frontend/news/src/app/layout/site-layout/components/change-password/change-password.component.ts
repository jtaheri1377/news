import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../modules/auth/services/auth.service';
import { NotifService } from '../../../../shared/services/notif.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  standalone: false,

  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent implements OnInit {
  myForm = new FormGroup({
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPassword: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmNewPassword: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  isLoading: boolean = false;
  showPass: boolean = false;
  showNewPass: boolean = false;
  showConfirmNewPass: boolean = false;
  subs: Subscription[] = [];

  constructor(
    private service: AuthService,
    private notif: NotifService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // if (data.province != null)
    //   this.myForm.patchValue({
    //     provinceId: data.province.id,
    //   });
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.myForm.invalid) {
      if (
        this.myForm.value.password!.length < 6 ||
        this.myForm.value.newPassword!.length < 6 ||
        this.myForm.value.confirmNewPassword!.length < 6
      )
        this.notif.warn('کلمه عبور نباید کمتر از 6 حرف باشد!');

      return;
    }

    var item: ChangePassword = {
      password: this.myForm.value.password!,
      newPassword: this.myForm.value.newPassword!,
      confirmNewPassword: this.myForm.value.confirmNewPassword!,
    };
    var sub = this.service.changePassword(item).subscribe(() => {
      this.notif.success('تغییر رمز با موفقیت انجام شد!');
      this.close();
    });

    // const item: ProvinceSave = {
    //   name: this.subjectForm.value.name || '',
    //   parentId: this.data.parentId,
    //   id: this.subjectForm.value.id != null ? this.subjectForm.value.id : 0,
    // };
    //
  }
}

export interface ChangePassword {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}
