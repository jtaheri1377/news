import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, forkJoin, Subject, Subscription } from 'rxjs';
import { AdminNewsService } from '../../services/admin-news.service';
import { Province } from '../../../../../core/models/province/province.model';
import {
  FileType,
  FileUpload,
  FileUploadResponse,
  UploadService,
} from '../../../../messenger/file-browser/services/upload.service';
import { FileUploadPreviewComponent } from '../../../../messenger/file-browser/components/file-upload-preview/file-upload-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { newsSave } from '../../models/newsSave.model';
import { stringify } from 'querystring';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-news-form',
  standalone: false,

  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss',
})
export class NewsFormComponent implements OnInit {
  newsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    img: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    studyTime: new FormControl<string>('', Validators.required),
    content: new FormControl<string>('', Validators.required),
    provinceId: new FormControl<number>(0, Validators.required),
    subjectId: new FormControl<number>(0, Validators.required),
    categoryIds: new FormControl<number[]>([], Validators.required),
    mediaIds: new FormControl<number[]>([], Validators.required),
  });
  isLoading: boolean = false;
  provinces: Province[] = [];
  counties: Province[] = [];
  subjects: Province[] = [];
  newsCategories: Province[] = [];
  subs: Subscription[] = [];
  mediaFiles: FileUpload[] = [];
  uploadedFiles: FileUploadResponse[] = [];

  constructor(
    private service: AdminNewsService,
    private adminService: AdminService,
    private uploadService: UploadService,
    private readonly dialog: MatDialog
  ) {}

  save() {
    let categoryIds = this.newsForm.get('categoryIds')?.value;

    if (!Array.isArray(categoryIds)) {
      categoryIds = categoryIds ? [categoryIds] : [];
      this.newsForm.get('categoryIds')?.setValue(categoryIds);
    }

    this.service.save(this.newsForm.value as newsSave).subscribe((res) => {
      console.log('Saved!');
    });
    console.log(this.newsForm.value);
  }

  onEditorChange(value: string) {
    this.newsForm.get('content')!.setValue(value);
  }

  ngOnInit(): void {
    this.initForm$();
  }

  initForm$() {
    this.isLoading = true;
    var sub = combineLatest([
      this.adminService.getProvinces(),
      this.adminService.getSubjects(),
      this.adminService.getNewsCategories(),
    ]).subscribe(([provinces, subjects, newsCategories]) => {
      this.provinces = provinces;
      this.subjects = subjects;
      this.newsCategories = newsCategories;
      this.isLoading = false;
    });
    this.subs.push(sub);
  }

  onSelectProvince(id: number) {
    var sub = this.adminService.getCounties(id).subscribe((result: Province[]) => {
      this.counties = result;
      this.isLoading = false;
    });
    this.subs.push(sub);
  }

  onFileSelected(value: FileUpload[], uploadingImageCover: boolean = false) {
    console.log(value);

    this.openDialog(value);
  }

  openDialog(files: FileUpload[]): void {
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        // this.messageForm.controls['messageControl'].setValue(result.message);
        console.log(result.files);

        this.mediaFiles = result.files;

        this.uploadFiles(result.files);
      }
    });
  }

  uploadFiles(files: File[], uploadingImageCover: boolean = false) {
    if (!files || files.length == 0) return;
    this.uploadService.uploadFiles(files).subscribe(
      (event:any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(
            (100 * event.loaded) / (event.total ?? 1)
          );
          console.log(`Progress: ${percentDone}%`);
        } else if (event.type === HttpEventType.Response) {
          console.log('Files uploaded successfully!', event.body);
          const responseFiles = event.body as FileUploadResponse[];
          this.uploadedFiles = [...this.uploadedFiles, ...responseFiles];

          if (!uploadingImageCover) {
            const ids: number[] = [];
            responseFiles.forEach((x) => {
              ids.push(x.id);
            });
            this.newsForm.get('mediaIds')?.setValue(ids);
          } else {
            this.newsForm.get('img')?.setValue(responseFiles[0].fileUrl);
          }
        }
      },
      (error:any) => {
        console.error('Upload failed:', error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
