import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  combineLatest,
  forkJoin,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { AdminNewsService } from '../../services/admin-news.service';
import { Province } from '../../../../../core/models/province/province.model';
import {
  FileType,
  FileUploadFull,
  FileUploadPreview,
  FileUploadResponse,
  UploadService,
} from '../../../../messenger/file-browser/services/upload.service';
import { FileUploadPreviewComponent } from '../../../../messenger/file-browser/components/file-upload-preview/file-upload-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { NewsSave } from '../../models/newsSave.model';
import { stringify } from 'querystring';
import { AdminService } from '../../../services/admin.service';
import { NotifService } from '../../../../../shared/services/notif.service';
import { SavedMedia } from '../../../story/models/sevedMedia.model';
import { NewsEditorComponent } from '../../../components/news-editor/news-editor.component';
import { NewsDetail } from '../../models/newsDetail.model';
import { ParentChild } from '../../../../models/ParentChild.model';

@Component({
  selector: 'app-news-form',
  standalone: false,

  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss',
})
export class NewsFormComponent implements OnInit, OnDestroy {
  myForm = new FormGroup({
    title: new FormControl('', Validators.required),
    img: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    studyTime: new FormControl<string>('', Validators.required),
    content: new FormControl<string>('', Validators.required),
    provinceId: new FormControl<number | null>(null, Validators.required),
    id: new FormControl<number | null>(null),
    parentProvinceId: new FormControl<number | null>(null, Validators.required),
    subjectId: new FormControl<number | null>(null, Validators.required),
    parentCategoryIds: new FormControl<number[]>([], Validators.required),
    categoryIds: new FormControl<number[]>([], Validators.required),
    mediaIds: new FormControl<number[]>([], Validators.required),
  });
  isLoading: boolean = false;
  uploadHasError: boolean = false;
  provinces: Province[] = [];
  counties: Province[] = [];
  subjects: Province[] = [];
  newsCategories: Province[] = [];
  newsChildCategories: Province[] = [];
  subs: Subscription[] = [];
  filesToUpload: FileUploadFull | null = null;
  imageCover: FileUploadFull | null = null;
  uploadedFiles: FileUploadResponse[] = [];
  savedMedias: SavedMedia[] = [];
  savedProvince: ParentChild | null = null;
  savedNewsCategory: ParentChild | null = null;
  savedImage: string = '';
  imageCoverId: number | null = null;
  @ViewChild('editor') editor!: NewsEditorComponent;

  constructor(
    private service: AdminNewsService,
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

    let categoryIds = this.myForm.get('categoryIds')?.value;

    if (!Array.isArray(categoryIds)) {
      categoryIds = categoryIds ? [categoryIds] : [];
      this.myForm.get('categoryIds')?.setValue(categoryIds);
    }

    const data: NewsSave = {
      id: this.myForm.value.id ?? 0,
      img: this.myForm.value.img!,
      description: this.myForm.value.description!,
      studyTime: this.myForm.value.studyTime!,
      categoryIds: this.myForm.value.categoryIds!,
      subjectId: this.myForm.value.subjectId!,
      title: this.myForm.value.title!,
      content: this.myForm.value.content!,
      provinceId: this.myForm.value.provinceId!,
      mediaIds: [this.imageCoverId!, ...this.myForm.value.mediaIds!],
    };
    this.service.save(data).subscribe((res) => {
      this.notif.success("خبر با موفقیت ذخیره شد");
      this.adminService.clearUploadViewer$.next(true);
      this.clearEditorContent();
      this.myForm.reset();
      this.clearEditorContent();
    });
    console.log(this.myForm.value);
  }

  onEditorChange(value: string) {
    this.myForm.get('content')!.setValue(value);
  }

  clearEditorContent() {
    this.editor.clearEditor();
  }

  ngOnInit(): void {
    this.initForm$();
    this.getSavedData();
  }

  getSavedData() {
    const sub = this.service.editingNews$
      .pipe(
        switchMap((id) => {
          return this.service.get(id!);
        })
      )
      .subscribe((item: NewsDetail | null) => {
        this.myForm.get('id')?.setValue(item!.id!);
        this.myForm.get('title')?.setValue(item?.title!);
        this.myForm.get('description')?.setValue(item?.description!);
        this.myForm.get('studyTime')?.setValue(item?.studyTime!);
        this.myForm.get('subjectId')?.setValue(item?.subjectId!);
        this.myForm.get('content')?.setValue(item?.content!);
        this.myForm.get('img')?.setValue(item?.img!);
        this.getSavedProvince$(item!.id!);
        this.getSavedCategory$(item!.id!);
        const mediaIds: number[] = [];

        item?.medias.forEach((x) => mediaIds.push(x.id));
        this.myForm.get('mediaIds')?.setValue(mediaIds);
        this.savedMedias = [...item?.medias!];
        this.savedImage = item!.img;
        this.editor.editorContent = item?.content!;
      });
    this.subs.push(sub);
  }

  getSavedProvince$(newsId: number) {
    this.isLoading = true;
    var sub = this.service
      .GetProvinceByStoryId(newsId)
      .subscribe((province: ParentChild) => {
        this.savedProvince = province;
        this.myForm.get('parentProvinceId')?.setValue(province.parentId);
        this.onSelectProvince(province.parentId!);
        this.myForm.get('provinceId')?.setValue(province.childId);
        this.isLoading = false;
      });
    this.subs.push(sub);
  }

  getSavedCategory$(newsId: number) {
    this.isLoading = true;

    var sub = this.service
      .GetNewsCategoryByNewsId(newsId)
      .subscribe((newsCategory: ParentChild) => {
        this.savedNewsCategory = newsCategory;
        this.myForm
          .get('parentCategoryIds')
          ?.setValue([newsCategory.parentId!]);
        this.onSelectCategory(newsCategory.parentId!);
        this.myForm.get('categoryIds')?.setValue([newsCategory.childId!]);
        this.isLoading = false;
      });
    this.subs.push(sub);
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

  onFileUploaded(files: any[]) {
    const ids: number[] = [];
    console.log('files: ', files);
    files.forEach((x) => {
      ids.push(x.id);
    });
    this.myForm.get('mediaIds')?.setValue(ids);
    this.notif.success('فایل آپلود شد: ' + ids);
    this.hasMediaError();
  }

  onImageUploaded(files: any[]) {
    this.imageCoverId = files[0].id;
    this.myForm.get('img')?.setValue(files[0].fileUrl ?? files[0].url);
    this.notif.success('فایل آپلود شد: ' + this.imageCoverId);
    // this.hasMediaError();
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
  hasImageError(): boolean {
    if (this.myForm.controls['img'].invalid) {
      this.uploadHasError = true;
      return true;
    } else {
      this.uploadHasError = false;
      return false;
    }
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

  onSelectCategory(id: number) {
    var sub = this.adminService
      .getSubNewsCategories(id)
      .subscribe((result: Province[]) => {
        this.newsChildCategories = result;
        this.isLoading = false;
      });
    this.subs.push(sub);
  }

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

          if (!uploadingImageCover) {
            const ids: number[] = [];
            responseFiles.forEach((x) => {
              ids.push(x.id);
            });
            this.myForm.get('mediaIds')?.setValue(ids);
          } else {
            this.myForm.get('img')?.setValue(responseFiles[0].fileUrl);
          }
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
