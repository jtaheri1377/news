import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminPermissionService } from '../../services/admin-permission.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifService } from '../../../../../../shared/services/notif.service';
import { PermissionSave } from '../../models/permission.model';

@Component({
  selector: 'app-admin-permission-form',
  standalone: false,

  templateUrl: './admin-permission-form.component.html',
  styleUrl: './admin-permission-form.component.scss',
})
export class AdminPermissionFormComponent {
  isEditMode: boolean = false;
  myForm = new FormGroup({
    name: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    id: new FormControl(),
  });

  constructor(
    private service: AdminPermissionService,
    private notif: NotifService,
    public dialogRef: MatDialogRef<AdminPermissionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;
    if (this.isEditMode)
      this.myForm.patchValue({
        id: data.id,
        name: data.name,
        title: data.title,
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    const item: PermissionSave = {
      name: this.myForm.value.name || '',
      parentId: this.data.parentId,
      title: this.myForm.value.title!,
      isSelected: false,
      id: this.myForm.value.id != null ? this.myForm.value.id : 0,
    };
    this.service.save(item).subscribe((res) => {
      this.service.PermissionListUpdate$.next(true);
      this.notif.success(
        `دسترسی با موفقیت ${this.isEditMode ? 'ویرایش شد' : 'افزوده شد'}`
      );
      this.close();
    });
  }
}
