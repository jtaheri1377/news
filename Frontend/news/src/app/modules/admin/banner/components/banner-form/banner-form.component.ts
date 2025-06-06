import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  FileUploadFull,
  FileUploadPreview,
  FileUploadResponse,
  UploadService,
} from '../../../../messenger/file-browser/services/upload.service';
import { BannerSave } from '../../models/BannerSave.model';
import { Province } from '../../../../../core/models/province/province.model';
import { AdminService } from '../../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadPreviewComponent } from '../../../../messenger/file-browser/components/file-upload-preview/file-upload-preview.component';
import { HttpEventType } from '@angular/common/http';
import { AdminBannerService } from '../../services/admin-banner.service';
import {
  NewsCategories,
  NewsCategory,
} from '../../../../../core/constants/news-categories';
import { SavedMedia } from '../../../story/models/sevedMedia.model';
import { ParentChild } from '../../../../models/ParentChild.model';
import { NotifService } from '../../../../../shared/services/notif.service';
import { NewsCategoryService } from '../../../../../core/constants/services/news-category.service';

@Component({
  selector: 'app-banner-form',
  standalone: false,

  templateUrl: './banner-form.component.html',
  styleUrl: './banner-form.component.scss',
})
export class BannerFormComponent implements OnInit, OnDestroy {
  myForm = new FormGroup({
    title: new FormControl(''),
    img: new FormControl<string>(''),
    description: new FormControl<string>(''),
    newsId: new FormControl<number | null>(null, Validators.required),
    categoryId: new FormControl<number | null>(null, Validators.required),
    id: new FormControl<number | null>(null),
  });
  isLoading: boolean = false;
  subs: Subscription[] = [];
  mediaFiles: FileUploadPreview[] = [];
  uploadHasError: boolean = false;
  newsCategories: Province[] = [];
  categories = NewsCategories;
  newsCategory: NewsCategory | null = null;
  imageCover: FileUploadFull | null = null;
  uploadedFiles: FileUploadResponse[] = [];
  savedMedias: SavedMedia[] = [];
  savedNewsCategory: ParentChild | null = null;
  savedImage: string = '';
  imageCoverId: number | null = null;

  constructor(
    private service: AdminBannerService,
    private adminService: AdminService,
    private uploadService: UploadService,
    private categoryService: NewsCategoryService,
    private notif: NotifService,
    private readonly dialog: MatDialog
  ) {}

  save() {
    if (this.myForm.invalid) {
      const controls: any = this.myForm.controls;
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAllAsTouched();
      });
      this.notif.ErrorToast('انتخاب دسته بندی ها به همراه یک خبر ضروری است.');
      return;
    }
    debugger;

    const data: BannerSave = {
      img: this.myForm.value.img!,
      description: this.myForm.value.description!,
      categoryId: this.myForm.value.categoryId!,
      newsId: this.myForm.value.newsId!,
      title: this.myForm.value.title!,
      id: this.myForm.value.id ?? 0,
    };
    this.service.save(data).subscribe((res: any) => {
      this.notif.successToast('عملیات با موفقیت ثبت شد');
    });
  }

  ngOnInit(): void {
    this.initForm$();
  }

  initForm$() {
    this.isLoading = true;
    var sub = this.adminService.getNewsCategories().subscribe((Categories) => {
      this.newsCategories = Categories;
      this.isLoading = false;
    });
    this.subs.push(sub);
  }

  onSelectNewsItem(id: number) {
    debugger;
    this.myForm.get('newsId')?.setValue(id);
  }

  onSelectCategory(id: number) {
    var keys = this.categoryService.findCategoryKeyPathByValue(id)?.keyPath;
    console.log('bread ', keys![0]);
    // console.log('parent ', breadCrump![0].slug);
    // console.log(
    //   'parent cateogry ',
    //   this.newsListCategories[breadCrump![0].slug]
    // );
    // console.log('child ', breadCrump![1].slug);
    // console.log(
    //   'child cateogry ',
    //   this.newsListCategories[breadCrump![0].slug].children![
    //     breadCrump![1].slug
    //   ]
    // );
    debugger;
    this.newsCategory = this.categories[keys![0]].children![keys![1]];

    // var sub = this.adminService
    //   .getSubNewsCategories(id)
    //   .subscribe((result: Province[]) => {

    //     this.newsChildCategories = result;
    //     this.isLoading = false;
    //   });
    // this.subs.push(sub);
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

  onImageUploaded(files: any[]) {
    this.imageCoverId = files[0].id;
    this.myForm.get('img')?.setValue(files[0].fileUrl ?? files[0].url);
    this.notif.successToast('فایل آپلود شد: ' + this.imageCoverId);
  }

  onFileSelected(value: FileUploadFull, uploadingImageCover: boolean = false) {
    console.log(value);

    // this.openDialog(value);
  }

  openDialog(files: FileUploadPreview[]): void {
    const dialogRef = this.dialog.open(FileUploadPreviewComponent, {
      data: {
        files: files,
      },
      disableClose: true,
      maxHeight: '95vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
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
