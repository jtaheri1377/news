import { Component, Inject, OnInit } from '@angular/core';
import { AdminProvinceService } from '../../../../modules/admin/province/services/admin-province.service';
import { NotifService } from '../../../../shared/services/notif.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../modules/admin/services/admin.service';
import { Province } from '../../../../core/models/province/province.model';
import { Subscription } from 'rxjs';
import { DrawerPusherService } from '../../../services/drawer-pusher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-place',
  standalone: false,

  templateUrl: './choose-place.component.html',
  styleUrl: './choose-place.component.scss',
})
export class ChoosePlaceComponent implements OnInit {
  myForm = new FormGroup({
    provinceId: new FormControl<number | null>(null, Validators.required),
    // parentProvinceId: new FormControl<number | null>(null, Validators.required),
  });
  isLoading: boolean = false;
  provinces: Province[] = [];
  counties: Province[] = [];
  subs: Subscription[] = [];

  constructor(
    private service: AdminProvinceService,
    private drawerService: DrawerPusherService,
    private adminService: AdminService,
    private router:Router,
    private notif: NotifService,
    public dialogRef: MatDialogRef<ChoosePlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data.province!=null)
    this.myForm.patchValue({
      provinceId: data.province.id,
      });
  }

  ngOnInit(): void {
    this.initForm$();
  }

  initForm$() {
    this.isLoading = true;
    var sub = this.adminService.getProvinces().subscribe((provinces) => {
      this.provinces = provinces;
      this.isLoading = false;
    });
    this.subs.push(sub);
  }

  close(): void {
    this.dialogRef.close();
  }

  onSelectProvince(id: number) {
    var sub = this.adminService
      .getCounties(id)
      .subscribe((result: Province[]) => {
        this.counties = result;
        this.isLoading = false;
      });
    this.subs.push(sub);
  }

  save() {
    var province: Province = {
      id: this.myForm.value.provinceId!,
      name: this.provinces.find((x) => x.id == this.myForm.value.provinceId!)
        ?.name!,
    };
    localStorage.setItem('province', JSON.stringify(province));
    this.drawerService.provinceUpdate$.next(true);
    this.router.navigate(['/jalasat'])

    // const item: ProvinceSave = {
    //   name: this.subjectForm.value.name || '',
    //   parentId: this.data.parentId,
    //   id: this.subjectForm.value.id != null ? this.subjectForm.value.id : 0,
    // };
    // this.service.save(item).subscribe((res) => {
    //   if (res.ok) this.service.ProvincesUpdate$.next(null);
    //   this.notif.success(
    //     `مکان با موفقیت ${this.isEditMode ? 'ویرایش شد' : 'افزوده شد'}`
    //   );
    //   this.close();
    // });
  }
}
