import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Province } from '../../../../../core/models/province/province.model';
import { combineLatest, Subscription } from 'rxjs';
import {
  FileUploadFull,
  FileUploadPreview,
  FileUploadResponse,
  UploadService,
} from '../../../../messenger/file-browser/services/upload.service';
import { FileUploadPreviewComponent } from '../../../../messenger/file-browser/components/file-upload-preview/file-upload-preview.component';
import { HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StorySave } from '../../models/storySave.model';
import { AdminStoryService } from '../../services/admin-story.service';
import { AdminService } from '../../../services/admin.service';
import { NotifService } from '../../../../../shared/services/notif.service';
import { Story } from '../../../../../core/models/story/story.model';
import { SavedMedia } from '../../models/sevedMedia.model';
import { ParentChild } from '../../../../models/ParentChild.model';

@Component({
  selector: 'app-story-form',
  standalone: false,

  templateUrl: './story-form.component.html',
  styleUrl: './story-form.component.scss',
})
export class StoryFormComponent implements OnInit {
  myForm = new FormGroup({
    id: new FormControl<number | null>(null),
    title: new FormControl('', [Validators.required, Validators.min(40)]),
    description: new FormControl(''),
    parentProvinceId: new FormControl<number | null>(null, Validators.required),
    provinceId: new FormControl<number | null>(null, Validators.required),
    mediaIds: new FormControl<number[]>([], Validators.required),
  });
  isLoading: boolean = false;
  uploadHasError: boolean = false;
  provinces: Province[] = [];
  counties: Province[] = []; //شهرستان ها
  subs: Subscription[] = [];
  mediaFiles: FileUploadPreview[] = [];
  savedMedias: SavedMedia[] = [];
  filesToUpload: FileUploadFull | null = null;
  savedProvince: ParentChild | null = null;

  constructor(
    private service: AdminStoryService,
    private adminService: AdminService,
    private uploadService: UploadService,
    private readonly dialog: MatDialog,
    private notif: NotifService
  ) {}

  save() {
    if (this.myForm.invalid) {
      const controls: any = this.myForm.controls;
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAllAsTouched();
      });
      this.notif.error('لطفا مشخصات را کامل وارد کنید.');
      this.hasMediaError();
      return;
    }

    const data: StorySave = {
      id: this.myForm.value.id ?? 0,
      title: this.myForm.value.title!,
      description: this.myForm.value.description!,

      provinceId: this.myForm.value.provinceId!,
      mediaIds: this.myForm.value.mediaIds!,
    };

    this.service.save(data).subscribe((res) => {
      this.myForm.reset();
      this.service.editingStory$.next(null);
      this.adminService.clearUploadViewer$.next(true);
      this.notif.success('استوری با موفقیت ذخیره شد');
    });
    console.log(this.myForm.value);
  }

  hasMediaError(): boolean {
    if (
      this.myForm.controls['mediaIds'].invalid ||
      (Array.isArray(this.myForm.controls['mediaIds'].value) &&
        this.myForm.controls['mediaIds'].value.length === 0)
    ) {
      this.uploadHasError = true;
      return true;
    } else {
      this.uploadHasError = false;
      return false;
    }
  }

  ngOnInit(): void {
    this.initForm$();
    this.getSavedData();
  }

  getSavedData() {
    const sub = this.service.editingStory$.subscribe((item: Story | null) => {
      this.myForm.get('id')?.setValue(item!.id);
      this.myForm.get('title')?.setValue(item?.title!);
      this.myForm.get('description')?.setValue(item?.description!);
      const mediaIds: number[] = [];
      item?.medias.forEach((x) => mediaIds.push(x.id));
      this.myForm.get('mediaIds')?.setValue(mediaIds);
      this.savedMedias = [...item?.medias!];
      this.getSavedProvince$(item!.id);
    });
    this.subs.push(sub);
  }

  getSavedProvince$(storyId: number) {
    this.isLoading = true;
    var sub = this.service
      .GetProvinceByStoryId(storyId)
      .subscribe((province: ParentChild) => {
        this.savedProvince = province;
        this.myForm.get('parentProvinceId')?.setValue(province.parentId);
        this.onSelectProvince(province.parentId!);
        this.myForm.get('provinceId')?.setValue(province.childId);
        this.isLoading = false;
      });
    this.subs.push(sub);
  }

  initForm$() {
    this.isLoading = true;
    var sub = this.adminService.getProvinces().subscribe((provinces) => {
      this.provinces = provinces;
      this.isLoading = false;
    });
    this.subs.push(sub);
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

  onFileSelected(value: FileUploadFull) {
    this.openDialog(value);
  }

  onFileUploaded(files: any[]) {
    const ids: number[] = [];
    console.log('files: ', files);
    files.forEach((x) => {
      ids.push(x.id);
    });
    this.myForm.get('mediaIds')?.setValue(ids);
    this.notif.success('فایل آپلود شد');

    this.hasMediaError();
  }

  openDialog(files: FileUploadFull): void {
    const dialogRef = this.dialog.open(FileUploadPreviewComponent, {
      data: {
        files: files,
        // message: this.messageForm.controls['messageControl']!.value ?? '',
      },
      disableClose: true,
      maxHeight: '95vh',
      // width: '99vw',
      // height: '95vh',
      // {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        // this.messageForm.controls['messageControl'].setValue(result.message);
        console.log(result.files);

        this.mediaFiles = result.files;
        this.filesToUpload = result.files;
        // this.uploadFiles(result.files.server);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
