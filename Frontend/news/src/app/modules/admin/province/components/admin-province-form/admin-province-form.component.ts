import {
  CollectionViewer,
  DataSource,
  SelectionChange,
} from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  Inject,
  inject,
  Injectable,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';
// import { TreeNode } from '../../models/treeNode.model';
import { AdminProvinceService } from '../../services/admin-province.service';
import { NotifService } from '../../../../../shared/services/notif.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProvinceSave } from '../../models/province-save.model';
import { ProvinceSelectableNode } from '../../../manage/roles/models/ProvinceSelectableNode.model';

class DynamicFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public expandable = false,
    public isLoading = signal(false)
  ) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ['Fruits', ['Apple', 'Orange', 'Banana']],
    ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']],
  ]);

  rootLevelNodes: string[] = ['Fruits', 'Vegetables'];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(
      (name) => new DynamicFlatNode(name, 0, true)
    );
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicDatabase
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe((change) => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(
      map(() => this.data)
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach((node) => this.toggleNode(node, false));
    }
  }
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading.set(true);

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          (name) =>
            new DynamicFlatNode(
              name,
              node.level + 1,
              this._database.isExpandable(name)
            )
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading.set(false);
    }, 1000);
  }
}

@Component({
  selector: 'app-admin-province-form',
  standalone: false,

  templateUrl: './admin-province-form.component.html',
  styleUrl: './admin-province-form.component.scss',
})
export class AdminProvinceFormComponent {
  isEditMode: boolean = false;
  subjectForm = new FormGroup({
    code: new FormControl(''),
    name: new FormControl('', Validators.required),
    id: new FormControl(),
  });

  constructor(
    private service: AdminProvinceService,
    private notif: NotifService,
    public dialogRef: MatDialogRef<AdminProvinceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = data.isEditMode;
    if (this.isEditMode)
      this.subjectForm.patchValue({
        id: data.id,
        name: data.name,
        code: data.code,
      });
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    const item: ProvinceSelectableNode  = {
      name: this.subjectForm.value.name || '',
       parentId: this.data.parentId,
       isSelected: this.data.isSelected,
       id: this.subjectForm.value.id !=null?this.subjectForm.value.id:0
    };
    this.service.save(item).subscribe((res) => {
      if (res.ok) this.service.ProvincesUpdate$.next(null);
      this.notif.success(
        `مکان با موفقیت ${this.isEditMode ? 'ویرایش شد' : 'افزوده شد'}`
      );
      this.close();
    });
  }
}
//   treeData: TreeNode[] = [
//     {
//       id: 2,
//       name: 'همدان',
//       code:'',
//       parentId:null,
//       children: [
//         {
//           code:'',
//           parentId:null,
//           id: 4,
//           name: 'کبودرآهنگ',
//         },
//         {
//           code:'',
//           parentId:null,
//           id: 5,
//           name: 'بهار',
//         },
//         {
//           code:'',
//           parentId:null,
//           id: 6,
//           name: 'شیرین سو',
//         },
//       ],
//     },
//   ];

//   onSelectionChange(nodes: any[]): void {
//     console.log('Selected nodes:', nodes);
//   }

//   onEditNode(node: any): void {
//     console.log('Edit node:', node);
//     // پیاده‌سازی منطق ویرایش
//   }

//   onDeleteNode(node: any): void {
//     console.log('Delete node:', node);
//     // پیاده‌سازی منطق حذف
//   }

//   selectedItems: TreeNode[] = [];

//   // onSelectionChange(items: TreeNode[]): void {
//   //   this.selectedItems = items;
//   //   console.log('Selected items:', items);
//   // }
//   constructor() {
//     const database = inject(DynamicDatabase);

//     this.treeControl = new FlatTreeControl<DynamicFlatNode>(
//       this.getLevel,
//       this.isExpandable
//     );
//     this.dataSource = new DynamicDataSource(this.treeControl, database);

//     this.dataSource.data = database.initialData();
//   }

//   treeControl: FlatTreeControl<DynamicFlatNode>;

//   dataSource: DynamicDataSource;

//   getLevel = (node: DynamicFlatNode) => node.level;

//   isExpandable = (node: DynamicFlatNode) => node.expandable;

//   hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
// }
// myForm = new FormGroup({
//   title: new FormControl('', Validators.required),
//   img: new FormControl<string>('', Validators.required),
//   description: new FormControl<string>('', Validators.required),
//   studyTime: new FormControl<string>('', Validators.required),
//   content: new FormControl<string>('', Validators.required),
//   provinceId: new FormControl<number | null>(null, Validators.required),
//   id: new FormControl<number | null>(null),
//   parentProvinceId: new FormControl<number | null>(null, Validators.required),
//   subjectId: new FormControl<number | null>(null, Validators.required),
//   parentCategoryIds: new FormControl<number[]>([], Validators.required),
//   categoryIds: new FormControl<number[]>([], Validators.required),
//   mediaIds: new FormControl<number[]>([], Validators.required),
// });
// isLoading: boolean = false;
// uploadHasError: boolean = false;
// provinces: Province[] = [];
// counties: Province[] = [];
// subjects: Province[] = [];
// newsCategories: Province[] = [];
// newsChildCategories: Province[] = [];
// subs: Subscription[] = [];
// filesToUpload: FileUploadFull | null = null;
// imageCover: FileUploadFull | null = null;
// uploadedFiles: FileUploadResponse[] = [];
// savedMedias: SavedMedia[] = [];
// savedProvince: ParentChild | null = null;
// savedNewsCategory: ParentChild | null = null;
// savedImage: string = '';
// imageCoverId: number | null = null;
// @ViewChild('editor') editor!: NewsEditorComponent;

// constructor(
//   private service: AdminNewsService,
//   private adminService: AdminService,
//   private uploadService: UploadService,
//   private readonly dialog: MatDialog,
//   private notif: NotifService
// ) {}

// constructor() {
//   const database = inject(DynamicDatabase);

//   this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
//   this.dataSource = new DynamicDataSource(this.treeControl, database);

//   this.dataSource.data = database.initialData();
// }

// treeControl: FlatTreeControl<DynamicFlatNode>;

// dataSource: DynamicDataSource;

// getLevel = (node: DynamicFlatNode) => node.level;

// isExpandable = (node: DynamicFlatNode) => node.expandable;

// hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

// save() {
//   if (this.myForm.invalid) {
//     const controls: any = this.myForm.controls;
//     Object.keys(controls).forEach((controlName) => {
//       controls[controlName].markAllAsTouched();
//     });
//     this.notif.ErrorToast('لطفا مشخصات را کامل وارد کنید.');
//     this.hasMediaError();
//     return;
//   }

//   let categoryIds = this.myForm.get('categoryIds')?.value;

//   if (!Array.isArray(categoryIds)) {
//     categoryIds = categoryIds ? [categoryIds] : [];
//     this.myForm.get('categoryIds')?.setValue(categoryIds);
//   }

//   const data: NewsSave = {
//     id: this.myForm.value.id ?? 0,
//     img: this.myForm.value.img!,
//     description: this.myForm.value.description!,
//     studyTime: this.myForm.value.studyTime!,
//     categoryIds: this.myForm.value.categoryIds!,
//     subjectId: this.myForm.value.subjectId!,
//     title: this.myForm.value.title!,
//     content: this.myForm.value.content!,
//     provinceId: this.myForm.value.provinceId!,
//     mediaIds: [this.imageCoverId!, ...this.myForm.value.mediaIds!],
//   };
//   this.service.save(data).subscribe((res) => {
//     this.notif.successToast('خبر با موفقیت ذخیره شد');
//     this.adminService.clearUploadViewer$.next(true);
//     this.clearEditorContent();
//     this.myForm.reset();
//     this.clearEditorContent();
//   });
//   console.log(this.myForm.value);
// }

// onEditorChange(value: string) {
//   this.myForm.get('content')!.setValue(value);
// }

// clearEditorContent() {
//   this.editor.clearEditor();
// }

// ngOnInit(): void {
//   this.initForm$();
//   this.getSavedData();
// }

// getSavedData() {
//   const sub = this.service.editingNews$
//     .pipe(
//       switchMap((id) => {
//         return this.service.get(id!);
//       })
//     )
//     .subscribe((item: NewsDetail | null) => {
//       this.myForm.get('id')?.setValue(item!.id!);
//       this.myForm.get('title')?.setValue(item?.title!);
//       this.myForm.get('description')?.setValue(item?.description!);
//       this.myForm.get('studyTime')?.setValue(item?.studyTime!);
//       this.myForm.get('subjectId')?.setValue(item?.subjectId!);
//       this.myForm.get('content')?.setValue(item?.content!);
//       this.myForm.get('img')?.setValue(item?.img!);
//       this.getSavedProvince$(item!.id!);
//       const mediaIds: number[] = [];
//
//       item?.medias.forEach((x) => mediaIds.push(x.id));
//       this.myForm.get('mediaIds')?.setValue(mediaIds);
//       this.savedMedias = [...item?.medias!];
//       this.savedImage = item!.img;
//       this.editor.editorContent = item?.content!;
//     });
//   this.subs.push(sub);
// }

// getSavedProvince$(newsId: number) {
//   this.isLoading = true;
//   var sub = this.service
//     .GetProvinceByStoryId(newsId)
//     .subscribe((province: ParentChild) => {
//       this.savedProvince = province;
//       this.myForm.get('parentProvinceId')?.setValue(province.parentId);
//       this.onSelectProvince(province.parentId!);
//       this.myForm.get('provinceId')?.setValue(province.childId);
//       this.isLoading = false;
//     });
//   this.subs.push(sub);
// }

// getSavedCategory$(newsId: number) {
//   this.isLoading = true;
//   var sub = this.service
//     .GetNewsCategoryByNewsId(newsId)
//     .subscribe((newsCategory: ParentChild) => {
//       this.savedNewsCategory = newsCategory;
//       this.myForm
//         .get('parentCategoryIds')
//         ?.setValue([newsCategory.parentId!]);
//       this.onSelectCategory(newsCategory.parentId!);
//       this.myForm.get('categoryIds')?.setValue([newsCategory.childId!]);
//       this.isLoading = false;
//     });
//   this.subs.push(sub);
// }

// initForm$() {
//   this.isLoading = true;
//   var sub = combineLatest([
//     this.adminService.getProvinces(),
//     this.adminService.getSubjects(),
//     this.adminService.getNewsCategories(),
//   ]).subscribe(([provinces, subjects, newsCategories]) => {
//     this.provinces = provinces;
//     this.subjects = subjects;
//     this.newsCategories = newsCategories;
//     this.isLoading = false;
//   });
//   this.subs.push(sub);
// }

// onFileUploaded(files: any[]) {
//   const ids: number[] = [];
//   console.log('files: ', files);
//   files.forEach((x) => {
//     ids.push(x.id);
//   });
//   this.myForm.get('mediaIds')?.setValue(ids);
//   this.notif.successToast('فایل آپلود شد: ' + ids);
//   this.hasMediaError();
// }

// onImageUploaded(files: any[]) {
//   this.imageCoverId = files[0].id;
//   this.myForm.get('img')?.setValue(files[0].fileUrl ?? files[0].url);
//   this.notif.successToast('فایل آپلود شد: ' + this.imageCoverId);
//   // this.hasMediaError();
// }

// hasMediaError(): boolean {
//   if (
//      this.myForm.controls['mediaIds'].invalid ||
//     (Array.isArray(this.myForm.controls['mediaIds'].value) &&
//       this.myForm.controls['mediaIds'].value.length === 0)
//   ) {
//     this.uploadHasError = true;
//     return true;
//   } else {
//     this.uploadHasError = false;
//     return false;
//   }
// }
// hasImageError(): boolean {
//   if (
//     this.myForm.controls['img'].invalid ) {
//     this.uploadHasError = true;
//     return true;
//   } else {
//     this.uploadHasError = false;
//     return false;
//   }
// }

// onSelectProvince(id: number) {
//   var sub = this.adminService
//     .getCounties(id)
//     .subscribe((result: Province[]) => {
//       this.counties = result;
//       this.isLoading = false;
//     });
//   this.subs.push(sub);
// }

// onSelectCategory(id: number) {
//   var sub = this.adminService
//     .getSubNewsCategories(id)
//     .subscribe((result: Province[]) => {
//       this.newsChildCategories = result;
//       this.isLoading = false;
//     });
//   this.subs.push(sub);
// }

// onFileSelected(value: FileUploadFull, uploadingImageCover: boolean = false) {
//   this.openDialog(value, uploadingImageCover);
// }

// openDialog(files: FileUploadFull, uploadingImageCover: boolean): void {
//   const dialogRef = this.dialog.open(FileUploadPreviewComponent, {
//     data: {
//       files: files,
//       // message: this.messageForm.controls['messageControl']!.value ?? '',
//     },
//     disableClose: true,
//     maxHeight: '95vh',
//     // width: '99vw',
//     // height: '95vh',
//     // {name: this.name(), animal: this.animal()},
//   });

//   dialogRef.afterClosed().subscribe((result: any) => {
//     if (result !== undefined) {
//       // this.messageForm.controls['messageControl'].setValue(result.message);
//       console.log(result.files);

//       if (uploadingImageCover) this.imageCover = result.files;
//       else this.filesToUpload = result.files;
//       // this.uploadFiles(result.files.server);
//     }
//   });
// }

// uploadFiles(files: File[], uploadingImageCover: boolean = false) {
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

//         if (!uploadingImageCover) {
//           const ids: number[] = [];
//           responseFiles.forEach((x) => {
//             ids.push(x.id);
//           });
//           this.myForm.get('mediaIds')?.setValue(ids);
//         } else {
//           this.myForm.get('img')?.setValue(responseFiles[0].fileUrl);
//         }
//       }
//     },
//     (error: any) => {
//       console.error('Upload failed:', error);
//     }
//   );
// }

//   ngOnDestroy(): void {
//     this.subs.forEach((x) => x.unsubscribe());
//   }
// }
