import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeNode } from '../../province/models/treeNode.model';
import { Subscription } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NotifService } from '../../../../shared/services/notif.service';
import { AdminProvinceFormComponent } from '../../province/components/admin-province-form/admin-province-form.component';
import { AdminProvinceService } from '../../province/services/admin-province.service';

@Component({
  selector: 'app-roles',
  standalone: false,

  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
   @Input() items: TreeNode[] = [];
  @Input() selectable: boolean = true;
  @Input() searchable: boolean = true;
  @Input() expandAll: boolean = false;
  @Input() showActions: boolean = true;

  @Output() selectionChange = new EventEmitter<TreeNode[]>();
  @Output() editNode = new EventEmitter<TreeNode>();
  @Output() deleteNode = new EventEmitter<TreeNode>();

  filteredItems: TreeNode[] = [];
  subs: Subscription[] = [];
  searchQuery: string = '';
  allSelected: boolean = false;
  isLoading: boolean = false;
  treenode = new TreeNode('', 0, null);
  allIndeterminate: boolean = false;

  // constructor(private service: AdminProvinceService) {}
  // ngOnInit() {
  //   this.fetchProvinces(); // فقط همین
  // }

  // fetchProvinces() {
  //   this.isLoading = true;
  //   const sub = this.service.getTree().subscribe((result: TreeNode[]) => {
  //     this.treeData = result;
  //     this.filteredData = result; // ✅ اینجا تنظیم شود
  //     this.isLoading = false;
  //   });
  //   this.subs.push(sub);
  // }
  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      parent: node.parent,
      parentId: node.parentId,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener!);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  provinces: TreeNode[] = [];

  constructor(
    private service: AdminProvinceService,
    private notif: NotifService,
    private dialog: MatDialog
  ) {
    this.dataSource.data = TREE_DATA2;
  }

  selectSubject() {
    console.log('fffffffffff');
  }

  ngOnInit(): void {
    this.getAllProvinces();
    this.service.ProvincesUpdate$.subscribe(() => {
      this.getAllProvinces();
    });
  }
  getAllProvinces() {
    this.service.getTree().subscribe((res: TreeNode[]) => {
      this.provinces = res;
      TREE_DATA2 = res;
      this.dataSource.data = TREE_DATA2;
      console.log(TREE_DATA2);
    });
  }

  deleteSubject(id: number) {
    // var dialogRes = this.dialog.open(ConfirmDialogComponent, {
    var dialogRes = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'حذف استان',
        message: 'آیا از حذف مکان مورد نظر اطمینان دارید؟',
      },
    });
    dialogRes.afterClosed().subscribe((answer: any) => {
      if (answer)
        this.service.delete(id).subscribe((res: HttpResponse<void>) => {
          if (res.ok) {
            this.notif.success('مکان مورد نظر حذف شد');
            this.getAllProvinces();
          }
        });
    });
  }

  saveProvince(item: TreeNode, isEditMode: boolean) {
    let config: MatDialogConfig = new MatDialogConfig();
     // if (item != undefined) {
    config.data = {
      isEditMode: isEditMode,
      id: item!.id,
      parent: item!.parent,
      name: item!.name,
      parentId: item!.parentId ?? null,
    };

    if (!isEditMode && item!.id != 0) {
      config.data.parentId = item!.id;
    }
    // }

    var dialogRes = this.dialog.open(AdminProvinceFormComponent, config);
    // var dialogRes = this.dialog.open(SaveSubjectComponent, config);
  }
}

let TREE_DATA2: TreeNode[] = [
  // {
  //   name: "تاریخ",
  //   children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruit loops" }],
  // },
  // {
  //   name: "اهلبیت علیهم السلام",
  //   children: [
  //     {
  //       name: "امام علی",
  //       children: [
  //         { name: "از ولادت تا امامت" },
  //         { name: "از امامت تا شهادت" },
  //       ],
  //     },
  //     {
  //       name: "حضرت زهرا",
  //       children: [{ name: "از ولادت تا .." }, { name: "Carrots" }],
  //     },
  //   ],
  // },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  parent: TreeNode[] | undefined;
  parentId: string | null;
  level: number;
}

//   onDelete(node: TreeNode, event: Event): void {
//     event.stopPropagation();
//     this.deleteNode.emit(node);
//   }

//   ngOnDestroy(): void {
//     this.subs.forEach((x) => x.unsubscribe());
//   }
// }
