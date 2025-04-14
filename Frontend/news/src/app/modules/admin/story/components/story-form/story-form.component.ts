import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Province } from '../../../../../core/models/province/province.model';
import { combineLatest, Subscription } from 'rxjs';
import {
  FileUpload,
  FileUploadResponse,
  UploadService,
} from '../../../../messenger/file-browser/services/upload.service';
import { FileUploadPreviewComponent } from '../../../../messenger/file-browser/components/file-upload-preview/file-upload-preview.component';
import { HttpEventType } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { StorySave } from '../../models/storySave.model';
import { AdminStoryService } from '../../services/admin-story.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-story-form',
  standalone: false,

  templateUrl: './story-form.component.html',
  styleUrl: './story-form.component.scss',
})
export class StoryFormComponent implements OnInit {
  newsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    provinceId: new FormControl<number>(0, Validators.required),
    mediaIds: new FormControl<number[]>([], Validators.required),
  });
  isLoading: boolean = false;
  provinces: Province[] = [];
  counties: Province[] = []; //شهرستان ها
  subs: Subscription[] = [];
  mediaFiles: FileUpload[] = [];
  uploadedFiles: FileUploadResponse[] = [];

  constructor(
    private service: AdminStoryService,
    private adminService: AdminService,
    private uploadService: UploadService,
    private readonly dialog: MatDialog
  ) {}

  save() {
    this.service.save(this.newsForm.value as StorySave).subscribe((res) => {
      console.log('Saved!');
    });
    console.log(this.newsForm.value);
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

  onSelectProvince(id: number) {
    var sub = this.adminService
      .getCounties(id)
      .subscribe((result: Province[]) => {
        this.counties = result;
        this.isLoading = false;
      });
    this.subs.push(sub);
  }

  onFileSelected(value: FileUpload[]) {
    console.log(value);
    this.openDialog(value);
    // this.mediaFiles = value;
    // this.uploadFiles(value as File[]);
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

    dialogRef.afterClosed().subscribe((result: any) => {
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

          const ids: number[] = [];
          responseFiles.forEach((x) => {
            ids.push(x.id);
          });
          this.newsForm.get('mediaIds')?.setValue(ids);
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
