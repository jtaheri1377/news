import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  FileUploadFull,
  FileUploadPreview,
  FileUploadResponse,
  UploadService,
} from '../../../../messenger/file-browser/services/upload.service';
import { SiteFileDisplayNames } from '../../../../../core/Enums/site-file-type';
import { AdminSiteFileService } from '../../services/admin-site-file.service';
import { MatDialog } from '@angular/material/dialog';
import { SiteFileSave } from '../../models/siteFileSave.model';
import { FileUploadPreviewComponent } from '../../../../messenger/file-browser/components/file-upload-preview/file-upload-preview.component';
import { HttpEventType } from '@angular/common/http';
import { SavedMedia } from '../../../story/models/sevedMedia.model';
import { ParentChild } from '../../../../models/ParentChild.model';
import { NotifService } from '../../../../../shared/services/notif.service';
import { SiteFileType } from '../../../../../core/Enums/site-file-type';

@Component({
  selector: 'app-site-file-form',
  standalone: false,

  templateUrl: './site-file-form.component.html',
  styleUrl: './site-file-form.component.scss',
})
export class SiteFileFormComponent implements OnInit, OnDestroy {
  myForm = new FormGroup({
    uploadId: new FormControl<number | null>(null, Validators.required),
    siteFileType: new FormControl<SiteFileType>(
      SiteFileType.Rules,
      Validators.required
    ),
    link: new FormControl<string | null>(''),
    fileUrl: new FormControl<string | null>(null, Validators.required),
  });
  uploadedFiles: FileUploadResponse[] = [];
  filesToUpload: FileUploadFull | null = null;
  savedMedias: SavedMedia[] = [];
  savedProvince: ParentChild | null = null;
  uploadHasError: boolean = false;
  savedNewsCategory: ParentChild | null = null;
  savedImage: string = '';
  imageCover: FileUploadFull | null = null;
  imageCoverId: number | null = null;
  isLoading: boolean = false;
  subs: Subscription[] = [];
  mediaFiles: FileUploadPreview[] = [];
  siteFiles = SiteFileType;
  siteFileEntries = Object.keys(SiteFileType)
    .filter((key) => isNaN(Number(key))) // حذف ورودی‌های برعکس عددی
    .map((key) => ({
      name: key,
      value: SiteFileType[key as keyof typeof SiteFileType],
    }));

  siteFileDisplays: any = SiteFileDisplayNames;

  constructor(
    private service: AdminSiteFileService,
    private uploadService: UploadService,
    private readonly dialog: MatDialog,
    private notif: NotifService
  ) {}

  save() {
    const controls: any = this.myForm.controls;
    Object.keys(controls).forEach((controlName) => {
      controls[controlName].markAllAsTouched();
    });
    const fileType = this.myForm.value.siteFileType;

    if (
      (fileType == SiteFileType.FirstLinkImage ||
        fileType == SiteFileType.SecondLinkImage ||
        fileType == SiteFileType.ThirdLinkImage ||
        fileType == SiteFileType.ForthLinkImage ||
        fileType == SiteFileType.FirstSocialLinkImage ||
        fileType == SiteFileType.SecondSocialLinkImage ||
        fileType == SiteFileType.ThirdSocialLinkImage ||
        fileType == SiteFileType.ForthSocialLinkImage) &&
      this.myForm.value.link?.trim().length == 0
    ) {
      this.notif.error('لطفا لینک را وارد کنید.');
      return;
    }
    if (this.myForm.invalid) {
      this.notif.error('لطفا مشخصات را کامل وارد کنید.');
      this.hasMediaError();

      return;
    }

    this.service
      .save(this.myForm.value as SiteFileSave)
      .subscribe((res: any) => {
           this.notif.success('تغییرات با موفقیت انجام شد!');

      });
    console.log(this.myForm.value);
  }

  ngOnInit(): void {}

  onFileSelected(value: FileUploadFull, uploadingImageCover: boolean = false) {
    this.openDialog(value, uploadingImageCover);
  }

  openDialog(files: FileUploadFull, uploadingImageCover: boolean): void {
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

        if (uploadingImageCover) this.imageCover = result.files;
        else this.filesToUpload = result.files;
        // this.uploadFiles(result.files.server);
      }
    });
  }

  // onSiteFileTypeSelected(type: SiteFileType) {
  //   this.isLinkRequired(type);
  // }

  isLinkRequired(): boolean {
    const fileType = this.myForm.value.siteFileType;

    if (
      fileType == SiteFileType.FirstLinkImage ||
      fileType == SiteFileType.SecondLinkImage ||
      fileType == SiteFileType.ThirdLinkImage ||
      fileType == SiteFileType.ForthLinkImage ||
      fileType == SiteFileType.FirstSocialLinkImage ||
      fileType == SiteFileType.SecondSocialLinkImage ||
      fileType == SiteFileType.ThirdSocialLinkImage ||
      fileType == SiteFileType.ForthSocialLinkImage
    ) {
      return true;
    }
    return false;
  }

  // uploadFiles(files: File[]) {
  //   if (!files || files.length == 0) return;
  //   this.uploadService.uploadFiles(files).subscribe(
  //     (event: any) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         const percentDone = Math.round(
  //           (100 * event.loaded) / (event.total ?? 1)
  //         );
  //         console.log(`Progress: ${percentDone}%`);
  //       } else if (event.type === HttpEventType.Response) {
  //         console.log('Files uploaded successfully!', event.body);
  //         const responseFiles = event.body as FileUploadResponse[];
  //         this.uploadedFiles = [...this.uploadedFiles, ...responseFiles];
  //         // upload img
  //         this.myForm.get('fileUrl')?.setValue(responseFiles[0].fileUrl);
  //         this.myForm.get('uploadId')?.setValue(responseFiles[0].id);
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Upload failed:', error);
  //     }
  //   );
  // }

  hasMediaError(): boolean {
    if (this.myForm.controls['fileUrl'].invalid) {
      this.uploadHasError = true;
      return true;
    } else {
      this.uploadHasError = false;
      return false;
    }
  }
  hasImageError(): boolean {
    if (this.myForm.controls['fileUrl'].invalid) {
      this.uploadHasError = true;
      return true;
    } else {
      this.uploadHasError = false;
      return false;
    }
  }

  onFileUploaded(files: any[]) {
    // const ids: number[] = [];
    // console.log('files: ', files);
    // files.forEach((x) => {
    //   ids.push(x.id);
    // });

    this.myForm.get('fileUrl')?.setValue(files[0].fileUrl);
    this.myForm.get('uploadId')?.setValue(files[0].id);
    this.notif.success('فایل آپلود شد: ');
    this.hasMediaError();
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
