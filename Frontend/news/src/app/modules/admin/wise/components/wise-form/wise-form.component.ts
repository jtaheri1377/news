import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, switchMap, throwError } from 'rxjs';
import {
  FileUploadFull,
  FileUploadPreview,
  FileUploadResponse,
  UploadService,
} from '../../../../messenger/file-browser/services/upload.service';
import { WiseSave } from '../../models/wise.model';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadPreviewComponent } from '../../../../messenger/file-browser/components/file-upload-preview/file-upload-preview.component';
import { HttpEventType } from '@angular/common/http';
import { AdminWiseService } from '../../services/admin-wise.service';
import { NotifService } from '../../../../../shared/services/notif.service';
import { Wise } from '../../../../../core/models/wise/wise.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wise-form',
  standalone: false,

  templateUrl: './wise-form.component.html',
  styleUrl: './wise-form.component.scss',
})
export class WiseFormComponent implements OnInit, OnDestroy {
  myForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    img: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
    author: new FormControl<string | null>(null, Validators.required),
    subject: new FormControl<string | null>(null, Validators.required),
    language: new FormControl<string | null>(null, Validators.required),
    volumeCount: new FormControl<number | null>(null, Validators.required),
    translator: new FormControl<string | null>(null),
    id: new FormControl<number | null>(null),
  });
  isLoading: boolean = false;
  uploadHasError: boolean = false;
  subs: Subscription[] = [];
  mediaFiles: FileUploadPreview[] = [];
  uploadedFiles: FileUploadResponse[] = [];
  savedImage: string = '';
  imageCoverId: number | null = null;
  imageCover: FileUploadFull | null = null;

  // constructor(
  //   private service: AdminWiseService,
  //   private uploadService: UploadService,
  //   private router: Router,
  //   private notif: NotifService,
  //   private readonly dialog: MatDialog
  // ) {}

  constructor(
    @Optional() private service?: AdminWiseService,
    @Optional() private uploadService?: UploadService,
    @Optional() private router?: Router,
    @Optional() private route?: ActivatedRoute,
    @Optional() private notif?: NotifService,
    @Optional() private dialog?: MatDialog
  ) {
    console.log('service:', service);
    console.log('uploadService:', uploadService);
    console.log('router:', router);

    console.log('notif:', notif);
    console.log('dialog:', dialog);
  }

  ngOnInit(): void {
    this.getSavedData();
  }

  getSavedData() {
    const sub = this.service!.editingWise$.subscribe((item: Wise | null) => {
      this.myForm.get('id')?.setValue(item!.id!);
      this.myForm.get('name')?.setValue(item!.name);
      this.myForm.get('description')?.setValue(item?.description!);
      this.myForm.get('author')?.setValue(item!.author);
      this.myForm.get('img')?.setValue(item!.img);
      this.myForm.get('subject')?.setValue(item!.subject);
      this.myForm.get('language')?.setValue(item!.language);
      this.myForm.get('translator')?.setValue(item!.translator);
      this.myForm.get('volumeCount')?.setValue(item!.volumeCount);
    });
    this.subs.push(sub);
  }

  save() {
    if (this.myForm.invalid) {
      const controls: any = this.myForm.controls;
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAllAsTouched();
      });
      this.notif!.error('لطفا مشخصات را تکمیل کنید.');
      return;
    }

    const data: WiseSave = {
      id: this.myForm.value.id != null ? this.myForm.value.id : 0,
      name: this.myForm.value.name!,
      description: this.myForm.value.description!,
      translator:
        this.myForm.value.translator != null
          ? this.myForm.value.translator
          : '',
      volumeCount: this.myForm.value.volumeCount!,
      img: this.myForm.value.img!,
      subject: this.myForm.value.subject!,
      language: this.myForm.value.language!,
      author: this.myForm.value.author!,
    };
    this.service!.save(data).subscribe((res: any) => {
      this.router!.navigate(['.', '..'], { relativeTo: this.route });
      this.notif!.success('عملیات با موفقیت ثبت شد');
    });
  }

  onImageUploaded(files: any[]) {
    this.imageCoverId = files[0].id;
    this.myForm.get('img')?.setValue(files[0].fileUrl ?? files[0].url);
    this.notif!.success('فایل آپلود شد: ' + this.imageCoverId);
    // this.hasMediaError();
  }

  hasImageError(): boolean {
    if (this.myForm.controls['img'].invalid) {
      this.uploadHasError = true;
      return true;
    } else {
      this.uploadHasError = false;
      return false;
    }
  }

  onFileSelected(value: FileUploadFull) {
    this.openDialog(value);
  }

  openDialog(files: FileUploadFull): void {
    const dialogRef = this.dialog!.open(FileUploadPreviewComponent, {
      data: {
        files: files,
        // message: this.messageForm.controls['messageControl']!.value ?? '',
      },
      disableClose: true,
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        this.imageCover = result.files;
      }
    });
  }

  uploadFiles(files: File[], uploadingImageCover: boolean = false) {
    if (!files || files.length == 0) return;
    this.uploadService!.uploadFiles(files).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(
            (100 * event.loaded) / (event.total ?? 1)
          );
          console.log(`Progress: ${percentDone}%`);
        } else if (event.type === HttpEventType.Response) {
          console.log('Files uploaded successfully!', event.body);
          const responseFiles = event.body as FileUploadResponse[];
          this.uploadedFiles = [...this.uploadedFiles, ...responseFiles];
          // upload img
          this.myForm.get('img')?.setValue(responseFiles[0].fileUrl);
        }
      },
      (error: any) => {
        console.error('Upload failed:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
