import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from '../../../../province/models/treeNode.model';
import { Subscription } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { NotifService } from '../../../../../../shared/services/notif.service';
import { AdminProvinceService } from '../../../../province/services/admin-province.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AdminProvinceFormComponent } from '../../../../province/components/admin-province-form/admin-province-form.component';
import { AdminRoleService } from '../../services/admin-role.service';
import { AdminPermissionService } from '../../services/admin-permission.service';
import { PermissionNode } from '../../models/permissionNode.model';
import { title } from 'process';
import { Permission } from '../../models/role.model copy';

@Component({
  selector: 'app-permission-list',
  standalone: false,

  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss',
})
export class PermissionListComponent implements OnInit {
  @Input() items: PermissionNode[] = [];
  @Input() selectable: boolean = true;
  @Input() searchable: boolean = true;
  @Input() expandAll: boolean = false;
  @Input() showActions: boolean = true;

  @Output() selectionChange = new EventEmitter<PermissionNode[]>();
  @Output() editNode = new EventEmitter<PermissionNode>();
  @Output() deleteNode = new EventEmitter<PermissionNode>();

  filteredItems: PermissionNode[] = [];
  subs: Subscription[] = [];
  searchQuery: string = '';
  allSelected: boolean = false;
  isLoading: boolean = false;
  treenode = new PermissionNode('','', 0, null);
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
  private _transformer = (node: PermissionNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      title:node.title,
      id: node.id,
      parent: node.parent,
      parentId: node.parentId,
      level: level,
    };
  };

  constructor(
    private service: AdminPermissionService,
    private notif: NotifService,
    private dialog: MatDialog
  ) {
    this.dataSource.data = this.TREE_DATA3;
  }

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
  permissions: PermissionNode[] = [];

  selectSubject() {
    console.log('fffffffffff');
  }

  ngOnInit(): void {
    this.getAllPermissions();
    this.service.PermissionListUpdate$.subscribe(() => {
      this.getAllPermissions();
    });
  }

  getAllPermissions() {
    this.service.getTree().subscribe((res: PermissionNode[]) => {
      this.permissions = res;
      this.TREE_DATA3 = res;
      this.dataSource.data = this.TREE_DATA3;
      console.log(this.TREE_DATA3);
    });
  }

  deleteSubject(id: number) {
    // var dialogRes = this.dialog.open(ConfirmDialogComponent, {
    var dialogRes = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'حذف دسترسی',
        message: 'آیا از حذف دسترسی مورد نظر اطمینان دارید؟',
      },
    });
    dialogRes.afterClosed().subscribe((answer: any) => {
      if (answer)
        this.service.delete(id).subscribe((res: any) => {
          this.notif.success('دسترسی مورد نظر حذف شد');
          this.getAllPermissions();
        });
    });
  }

  savePermission(item: PermissionNode, isEditMode: boolean) {
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
  TREE_DATA3: PermissionNode[] = [
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
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  title: string;
  id: number;
  parent: PermissionNode[] | undefined;
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
