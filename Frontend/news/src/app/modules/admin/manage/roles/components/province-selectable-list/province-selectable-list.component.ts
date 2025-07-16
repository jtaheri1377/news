import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { NotifService } from '../../../../../../shared/services/notif.service';
import { AdminProvinceFormComponent } from '../../../../province/components/admin-province-form/admin-province-form.component';
import { ProvinceSelectableNode } from '../../models/ProvinceSelectableNode.model';
// import { Adminprovinceservice } from '../../services/admin-Provinc.service';
import { AdminProvinceService } from '../../../../province/services/admin-province.service';

interface SelectionGroup {
  selectedIds: number[];
  unselectedIds: number[];
}

@Component({
  selector: 'app-province-selectable-list',
  standalone: false,

  templateUrl: './province-selectable-list.component.html',
  styleUrl: './province-selectable-list.component.scss',
})
export class ProvinceSelectableListComponent implements OnInit, OnChanges {
  @Input() items: ProvinceSelectableNode[] = [];
  @Input() selectable: boolean = true;
  @Input() searchable: boolean = true;
  @Input() expandAll: boolean = false;
  @Input() showActions: boolean = true;

  // New Input: Array of IDs that should be selected in the tree
  @Input() selectedProvinceIds: number[] = [];

  // Output event to emit the grouped selected and unselected IDs
  @Output() selectionChange = new EventEmitter<number[]>(); // Changed back to SelectionGroup as per previous request
  @Output() editNode = new EventEmitter<ProvinceSelectableNode>();
  @Output() deleteNode = new EventEmitter<ProvinceSelectableNode>();

  filteredItems: ProvinceSelectableNode[] = [];
  searchQuery: string = '';
  allSelected: boolean = false;
  isLoading: boolean = false;
  treenode = new ProvinceSelectableNode('', 0, null, false);
  allIndeterminate: boolean = false;

  private _transformer = (node: ProvinceSelectableNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      id: node.id,
      parent: node.parent,
      isSelected: node.isSelected,
      parentId: node.parentId,
      level: level,
    };
  };

  constructor(
    private service: AdminProvinceService,
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
  provinces: ProvinceSelectableNode[] = [];

  ngOnInit(): void {
    this.getAllprovinces();
    this.service.ProvincesUpdate$.subscribe(() => {
      this.getAllprovinces();
    });
  }

  /**
   * Lifecycle hook that is called when any data-bound input property of a directive changes.
   * Used here to react to changes in `selectedProvincIds` input.
   * @param changes Object containing current and previous property values.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Check if selectedProvincIds input has changed and if provinces data is already loaded
    if (changes['selectedProvincIds'] && this.provinces.length > 0) {
      const newSelectedIds = changes['selectedProvincIds']
        .currentValue as number[];
      this.applySelectionFromInput(newSelectedIds);
    }
  }

  /**
   * Fetches all provinces from the service and updates the tree data.
   */
  getAllprovinces() {
    this.service.getTree().subscribe((res: ProvinceSelectableNode[]) => {
      this.provinces = res;
      this.TREE_DATA3 = res;
      // Store current expansion state before updating dataSource
      const expandedNodeIds = new Set<number>();
      this.treeControl.expansionModel.selected.forEach((node) =>
        expandedNodeIds.add(node.id)
      );

      this.dataSource.data = this.TREE_DATA3; // Update the data source for the tree

      // Restore expansion state
      this.treeControl.dataNodes.forEach((node) => {
        if (expandedNodeIds.has(node.id)) {
          this.treeControl.expand(node);
        }
      });

      console.log('provinces loaded:', this.TREE_DATA3);

      // After loading data, if there are initial selectedProvincIds, apply them
      if (this.selectedProvinceIds && this.selectedProvinceIds.length > 0) {
        this.applySelectionFromInput(this.selectedProvinceIds);
      } else {
        // If no initial selected IDs, just emit the current (possibly empty) selection
        this.emitCurrentSelection();
      }
    });
  }

  /**
   * Applies selection states to the tree nodes based on an array of provided IDs.
   * This method first resets all selections, then sets `isSelected` for matching nodes,
   * and finally updates parent selection states.
   * @param idsToSelect An array of IDs that should be marked as selected.
   */
  private applySelectionFromInput(idsToSelect: number[]): void {
    // 1. Store current expansion state
    const expandedNodeIds = new Set<number>();
    this.treeControl.expansionModel.selected.forEach((node) =>
      expandedNodeIds.add(node.id)
    );

    // 2. Reset all existing selections in the tree to ensure a clean state
    this.resetAllSelections(this.provinces);

    // 3. Mark nodes as selected based on the input IDs
    idsToSelect.forEach((id) => {
      const nodeToSelect = this.findNodeInTree(this.provinces, id);
      if (nodeToSelect) {
        nodeToSelect.isSelected = true;
      }
    });

    // 4. After all direct selections are applied, re-evaluate and update parent selections
    const allFlatNodes = this.treeControl.dataNodes;
    allFlatNodes.forEach((flatNode) => {
      const originalNode = this.findNodeInTree(this.provinces, flatNode.id);
      if (originalNode) {
        this.updateParentSelection(originalNode);
      }
    });

    // 5. Refresh the data source to reflect the changes in the UI
    this.dataSource.data = [...this.provinces];

    // 6. Restore expansion state
    this.treeControl.dataNodes.forEach((node) => {
      if (expandedNodeIds.has(node.id)) {
        this.treeControl.expand(node);
      }
    });

    // 7. Emit the updated selection state to the parent component
    this.emitCurrentSelection();
  }

  /**
   * Resets the `isSelected` property of all nodes in the tree to `false`.
   * @param nodes The array of ProvinceSelectableNodes to reset.
   */
  private resetAllSelections(nodes: ProvinceSelectableNode[]): void {
    nodes.forEach((node) => {
      node.isSelected = false;
      if (node.children) {
        this.resetAllSelections(node.children);
      }
    });
  }

  /**
   * Handles the change event of a checkbox on a tree node.
   * Updates the selection state of the node, its children, and its parents.
   * Finally, emits the entire updated tree data.
   * @param node The flattened node that was clicked.
   * @param isSelected The new selection state (true/false).
   */
  onSelectionChange(node: ExampleFlatNode, isSelected: boolean): void {
    // 1. Store current expansion state
    const expandedNodeIds = new Set<number>();
    this.treeControl.expansionModel.selected.forEach((expandedNode) =>
      expandedNodeIds.add(expandedNode.id)
    );

    // 2. Update the selection state of the clicked node and its descendants/ancestors
    const originalNode = this.findNodeInTree(this.provinces, node.id);

    if (originalNode) {
      originalNode.isSelected = isSelected;
      this.updateChildrenSelection(originalNode, isSelected);
      this.updateParentSelection(originalNode);
    }

    // 3. Refresh the data source to reflect the changes in the UI
    this.dataSource.data = [...this.provinces];

    // 4. Restore expansion state
    this.treeControl.dataNodes.forEach((n) => {
      if (expandedNodeIds.has(n.id)) {
        this.treeControl.expand(n);
      }
    });

    // 5. Emit the updated selection state to the parent component
    this.emitCurrentSelection();
  }

  /**
   * Recursively updates the `isSelected` state of all children of a given node.
   * @param node The parent node whose children need to be updated.
   * @param isSelected The selection state to apply to children.
   */
  private updateChildrenSelection(
    node: ProvinceSelectableNode,
    isSelected: boolean
  ): void {
    if (node.children) {
      node.children.forEach((child) => {
        child.isSelected = isSelected;
        this.updateChildrenSelection(child, isSelected);
      });
    }
  }

  /**
   * Recursively updates the `isSelected` state of parent nodes based on their children's states.
   * This method propagates changes upwards from the modified node.
   * @param node The node whose parent's selection state needs to be re-evaluated.
   */
  private updateParentSelection(node: ProvinceSelectableNode): void {
    if (node.parentId !== null && node.parentId !== undefined) {
      const parentNode = this.findNodeInTree(this.provinces, node.parentId);

      if (parentNode) {
        const allChildrenSelected = parentNode.children?.every(
          (child) => child.isSelected
        );
        const anyChildSelected = parentNode.children?.some(
          (child) => child.isSelected
        );

        if (allChildrenSelected) {
          parentNode.isSelected = true;
        } else if (anyChildSelected) {
          parentNode.isSelected = false;
        } else {
          parentNode.isSelected = false;
        }
        this.updateParentSelection(parentNode);
      }
    }
  }

  /**
   * Finds a ProvinceSelectableNode in the hierarchical tree structure by its ID.
   * @param nodes The array of ProvinceSelectableNodes to search within.
   * @param id The ID of the node to find.
   * @returns The found ProvinceSelectableNode or undefined if not found.
   */
  private findNodeInTree(
    nodes: ProvinceSelectableNode[],
    id: number
  ): ProvinceSelectableNode | undefined {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeInTree(node.children, id);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  /**
   * Helper function to check if a node itself or any of its descendants are selected.
   * This is used to determine which nodes should have their IDs grouped.
   * @param node The ProvinceSelectableNode to check.
   * @returns True if the node or any of its descendants are selected, false otherwise.
   */
  private isNodeOrDescendantSelected(node: ProvinceSelectableNode): boolean {
    if (node.isSelected) {
      return true;
    }
    if (node.children && node.children.length > 0) {
      return node.children.some((child) =>
        this.isNodeOrDescendantSelected(child)
      );
    }
    return false;
  }

  /**
   * Helper function to recursively flatten a list of ProvinceSelectableNodes.
   * Used to create a flat list of all nodes for processing.
   * @param nodes The array of ProvinceSelectableNodes to flatten.
   * @returns A flat array of all ProvinceSelectableNodes in the subtree.
   */
  private getFlatNodesRecursive(
    nodes: ProvinceSelectableNode[]
  ): ProvinceSelectableNode[] {
    return nodes.reduce(
      (acc: ProvinceSelectableNode[], node: ProvinceSelectableNode) => {
        acc.push(node);
        if (node.children) {
          acc.push(...this.getFlatNodesRecursive(node.children));
        }
        return acc;
      },
      []
    );
  }

  /**
   * Collects and groups the IDs of all nodes into 'selected' and 'unselected' categories.
   * A node is considered 'selected' if itself or any of its descendants are selected.
   * @param nodes The array of ProvinceSelectableNodes (the entire tree) to process.
   * @returns An object containing two arrays: `selectedIds` and `unselectedIds`.
   */
  private getGroupedSelectionStatus(
    nodes: ProvinceSelectableNode[]
  ): SelectionGroup {
    const allNodes: ProvinceSelectableNode[] =
      this.getFlatNodesRecursive(nodes); // Flatten the entire tree

    const selectedIds = new Set<number>();
    const unselectedIds = new Set<number>();

    allNodes.forEach((node) => {
      if (this.isNodeOrDescendantSelected(node)) {
        selectedIds.add(node.id);
      } else {
        unselectedIds.add(node.id);
      }
    });

    return {
      selectedIds: Array.from(selectedIds),
      unselectedIds: Array.from(unselectedIds),
    };
  }

  /**
   * Emits the current state of the grouped selected and unselected IDs via the `selectionChange` Output.
   */
  private emitCurrentSelection(): void {
    const groupedStatus = this.getGroupedSelectionStatus(this.provinces);
    this.selectionChange.emit(groupedStatus.selectedIds); // Emitting the full SelectionGroup object
    console.log('Emitting grouped selection status:', groupedStatus);
  }

  /**
   * Handles the deletion of a Provinc subject.
   * @param id The ID of the Provinc to delete.
   */
  deleteSubject(id: number) {
    const dialogRes = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'حذف استان',
        message: 'آیا از حذف استان مورد نظر اطمینان دارید؟',
      },
    });
    dialogRes.afterClosed().subscribe((answer: any) => {
      if (answer) {
        this.service.delete(id).subscribe({
          next: (res: any) => {
            this.notif.success('استان مورد نظر حذف شد');
            this.getAllprovinces();
          },
          error: (err: any) => {
            this.notif.error('خطا در حذف استان');
            console.error('Error deleting Provinc:', err);
          },
        });
      }
    });
  }

  /**
   * Opens the form to save (add/edit) a Provinc.
   * @param item The Provinc node to edit or use as a parent for a new node.
   * @param isEditMode True if in edit mode, false for adding a new node.
   */
  saveProvince(item: ProvinceSelectableNode, isEditMode: boolean) {
    let config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      isEditMode: isEditMode,
      id: item!.id,
      parent: item!.parent,
      name: item!.name,
      parentId: item!.parentId ?? null,
    };

    if (!isEditMode && item!.id !== 0) {
      config.data.parentId = item!.id;
    }

    this.dialog.open(AdminProvinceFormComponent, config);
  }

  TREE_DATA3: ProvinceSelectableNode[] = [];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  id: number;
  isSelected: boolean;
  parent: ProvinceSelectableNode[] | undefined;
  parentId: number | null;
  level: number;
}

// Define the interface for the output data structure
interface SelectionGroup {
  selectedIds: number[];
  unselectedIds: number[];
}

// export class ProvinceSelectableListComponent implements OnInit, OnChanges {
//   @Input() items: ProvinceSelectableNode[] = [];
//   @Input() selectable: boolean = true;
//   @Input() searchable: boolean = true;
//   @Input() expandAll: boolean = false;
//   @Input() showActions: boolean = true;

//   @Input() selectedProvinceIds: number[] = [];

//   @Output() selectionChange = new EventEmitter<number[]>();
//   @Output() editNode = new EventEmitter<ProvinceSelectableNode>();
//   @Output() deleteNode = new EventEmitter<ProvinceSelectableNode>();

//   filteredItems: ProvinceSelectableNode[] = [];
//   subs: Subscription[] = [];
//   searchQuery: string = '';
//   allSelected: boolean = false;
//   isLoading: boolean = false;
//   treenode = new ProvinceSelectableNode('', 0, 0, false);
//   allIndeterminate: boolean = false;

//   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
//   provinces: ProvinceSelectableNode[] = [];

//   ngOnChanges(changes: SimpleChanges): void {
//     // Check if selectedProvincIds input has changed and if provinces data is already loaded
//     if (changes['selectedProvinceIds'] && this.provinces.length > 0) {
//       const newSelectedIds = changes['selectedProvinceIds']
//         .currentValue as number[];
//       this.applySelectionFromInput(newSelectedIds);
//     }
//   }

//   private applySelectionFromInput(idsToSelect: number[]): void {
//     // 1. Store current expansion state
//     const expandedNodeIds = new Set<number>();
//     this.treeControl.expansionModel.selected.forEach((node) =>
//       expandedNodeIds.add(node.id)
//     );

//     // 2. Reset all existing selections in the tree to ensure a clean state
//     this.resetAllSelections(this.provinces);

//     // 3. Mark nodes as selected based on the input IDs
//     idsToSelect.forEach((id) => {
//       const nodeToSelect = this.findNodeInTree(this.provinces, id);
//       if (nodeToSelect) {
//         nodeToSelect.isSelected = true;
//       }
//     });

//     // 4. After all direct selections are applied, re-evaluate and update parent selections
//     const allFlatNodes = this.treeControl.dataNodes;
//     allFlatNodes.forEach((flatNode) => {
//       const originalNode = this.findNodeInTree(this.provinces, flatNode.id);
//       if (originalNode) {
//         this.updateParentSelection(originalNode);
//       }
//     });

//     // 5. Refresh the data source to reflect the changes in the UI
//     this.dataSource.data = [...this.provinces];

//     // 6. Restore expansion state
//     this.treeControl.dataNodes.forEach((node) => {
//       if (expandedNodeIds.has(node.id)) {
//         this.treeControl.expand(node);
//       }
//     });

//     // 7. Emit the updated selection state to the parent component
//     this.emitCurrentSelection();
//   }

//   private resetAllSelections(nodes: ProvinceSelectableNode[]): void {
//     nodes.forEach((node) => {
//       node.isSelected = false;
//       if (node.children) {
//         this.resetAllSelections(node.children);
//       }
//     });
//   }

//   // constructor(private service: AdminProvinceService) {}
//   // ngOnInit() {
//   //   this.fetchProvinces(); // فقط همین
//   // }

//   // fetchProvinces() {
//   //   this.isLoading = true;
//   //   const sub = this.service.getTree().subscribe((result: TreeNode[]) => {
//   //     this.treeData = result;
//   //     this.filteredData = result; // ✅ اینجا تنظیم شود
//   //     this.isLoading = false;
//   //   });
//   //   this.subs.push(sub);
//   // }
//   private _transformer = (node: ProvinceSelectableNode, level: number) => {
//     return {
//       expandable: !!node.children && node.children.length > 0,
//       name: node.name,
//       id: node.id,
//       parent: node.parent,
//       parentId: node.parentId,
//       level: level,
//     };
//   };

//   constructor(
//     private service: AdminProvinceService,
//     private notif: NotifService,
//     private dialog: MatDialog
//   ) {
//     this.dataSource.data = this.TREE_DATA3;
//   }

//   treeControl = new FlatTreeControl<ExampleFlatNode>(
//     (node) => node.level,
//     (node) => node.expandable
//   );

//   treeFlattener = new MatTreeFlattener(
//     this._transformer,
//     (node) => node.level,
//     (node) => node.expandable,
//     (node) => node.children
//   );

//   dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener!);

//   selectSubject() {
//     console.log('fffffffffff');
//   }

//   ngOnInit(): void {
//     this.getAllProvinces();
//     this.service.ProvincesUpdate$.subscribe(() => {
//       this.getAllProvinces();
//     });
//   }

//   getAllProvinces() {
//     this.service.getTree().subscribe((res: ProvinceSelectableNode[]) => {
//       this.provinces = res;
//       this.TREE_DATA3 = res;
//       this.dataSource.data = this.TREE_DATA3;
//       console.log(this.TREE_DATA3);
//     });
//   }

//   onSelectionChange(node: ExampleFlatNode, isSelected: boolean): void {
//     // 1. Store current expansion state
//     const expandedNodeIds = new Set<number>();
//     this.treeControl.expansionModel.selected.forEach((expandedNode) =>
//       expandedNodeIds.add(expandedNode.id)
//     );

//     // 2. Update the selection state of the clicked node and its descendants/ancestors
//     const originalNode = this.findNodeInTree(this.provinces, node.id);

//     if (originalNode) {
//       originalNode.isSelected = isSelected;
//       this.updateChildrenSelection(originalNode, isSelected);
//       this.updateParentSelection(originalNode);
//     }

//     // 3. Refresh the data source to reflect the changes in the UI
//     this.dataSource.data = [...this.provinces];

//     // 4. Restore expansion state
//     this.treeControl.dataNodes.forEach((n) => {
//       if (expandedNodeIds.has(n.id)) {
//         this.treeControl.expand(n);
//       }
//     });

//     // 5. Emit the updated selection state to the parent component
//     this.emitCurrentSelection();
//   }

//   /**
//    * Recursively updates the `isSelected` state of all children of a given node.
//    * @param node The parent node whose children need to be updated.
//    * @param isSelected The selection state to apply to children.
//    */
//   private updateChildrenSelection(
//     node: ProvinceSelectableNode,
//     isSelected: boolean
//   ): void {
//     if (node.children) {
//       node.children.forEach((child) => {
//         child.isSelected = isSelected;
//         this.updateChildrenSelection(child, isSelected);
//       });
//     }
//   }

//   deleteSubject(id: number) {
//     // var dialogRes = this.dialog.open(ConfirmDialogComponent, {
//     var dialogRes = this.dialog.open(ConfirmDialogComponent, {
//       data: {
//         title: 'حذف استان',
//         message: 'آیا از حذف استان مورد نظر اطمینان دارید؟',
//       },
//     });
//     dialogRes.afterClosed().subscribe((answer: any) => {
//       if (answer)
//         this.service.delete(id).subscribe((res: any) => {
//           this.notif.success('استان مورد نظر حذف شد');
//           this.getAllProvinces();
//         });
//     });
//   }

//   private updateParentSelection(node: ProvinceSelectableNode): void {
//     if (node.parentId !== null && node.parentId !== undefined) {
//       const parentNode = this.findNodeInTree(this.provinces, node.parentId);

//       if (parentNode) {
//         const allChildrenSelected = parentNode.children?.every(
//           (child) => child.isSelected
//         );
//         const anyChildSelected = parentNode.children?.some(
//           (child) => child.isSelected
//         );

//         if (allChildrenSelected) {
//           parentNode.isSelected = true;
//         } else if (anyChildSelected) {
//           parentNode.isSelected = false;
//         } else {
//           parentNode.isSelected = false;
//         }
//         this.updateParentSelection(parentNode);
//       }
//     }
//   }

//   /**
//    * Finds a ProvinceSelectableNode in the hierarchical tree structure by its ID.
//    * @param nodes The array of ProvinceSelectableNodes to search within.
//    * @param id The ID of the node to find.
//    * @returns The found ProvinceSelectableNode or undefined if not found.
//    */
//   private findNodeInTree(
//     nodes: ProvinceSelectableNode[],
//     id: number
//   ): ProvinceSelectableNode | undefined {
//     for (const node of nodes) {
//       if (node.id === id) {
//         return node;
//       }
//       if (node.children) {
//         const found = this.findNodeInTree(node.children, id);
//         if (found) {
//           return found;
//         }
//       }
//     }
//     return undefined;
//   }

//   /**
//    * Helper function to check if a node itself or any of its descendants are selected.
//    * This is used to determine which nodes should have their IDs grouped.
//    * @param node The ProvinceSelectableNode to check.
//    * @returns True if the node or any of its descendants are selected, false otherwise.
//    */
//   private isNodeOrDescendantSelected(node: ProvinceSelectableNode): boolean {
//     if (node.isSelected) {
//       return true;
//     }
//     if (node.children && node.children.length > 0) {
//       return node.children.some((child) =>
//         this.isNodeOrDescendantSelected(child)
//       );
//     }
//     return false;
//   }

//   /**
//    * Helper function to recursively flatten a list of ProvinceSelectableNodes.
//    * Used to create a flat list of all nodes for processing.
//    * @param nodes The array of ProvinceSelectableNodes to flatten.
//    * @returns A flat array of all ProvinceSelectableNodes in the subtree.
//    */
//   private getFlatNodesRecursive(
//     nodes: ProvinceSelectableNode[]
//   ): ProvinceSelectableNode[] {
//     return nodes.reduce(
//       (acc: ProvinceSelectableNode[], node: ProvinceSelectableNode) => {
//         acc.push(node);
//         if (node.children) {
//           acc.push(...this.getFlatNodesRecursive(node.children));
//         }
//         return acc;
//       },
//       []
//     );
//   }

//   /**
//    * Collects and groups the IDs of all nodes into 'selected' and 'unselected' categories.
//    * A node is considered 'selected' if itself or any of its descendants are selected.
//    * @param nodes The array of ProvinceSelectableNodes (the entire tree) to process.
//    * @returns An object containing two arrays: `selectedIds` and `unselectedIds`.
//    */
//   private getGroupedSelectionStatus(
//     nodes: ProvinceSelectableNode[]
//   ): SelectionGroup {
//     const allNodes: ProvinceSelectableNode[] =
//       this.getFlatNodesRecursive(nodes); // Flatten the entire tree

//     const selectedIds = new Set<number>();
//     const unselectedIds = new Set<number>();

//     allNodes.forEach((node) => {
//       if (this.isNodeOrDescendantSelected(node)) {
//         selectedIds.add(node.id);
//       } else {
//         unselectedIds.add(node.id);
//       }
//     });

//     return {
//       selectedIds: Array.from(selectedIds),
//       unselectedIds: Array.from(unselectedIds),
//     };
//   }

//   /**
//    * Emits the current state of the grouped selected and unselected IDs via the `selectionChange` Output.
//    */
//   private emitCurrentSelection(): void {
//     const groupedStatus = this.getGroupedSelectionStatus(this.provinces);
//     this.selectionChange.emit(groupedStatus.selectedIds); // Emitting the full SelectionGroup object
//     console.log('Emitting grouped selection status:', groupedStatus);
//   }

//   saveProvince(item: ProvinceSelectableNode, isEditMode: boolean) {
//     let config: MatDialogConfig = new MatDialogConfig();
//     // if (item != undefined) {
//     config.data = {
//       isEditMode: isEditMode,
//       id: item!.id,
//       parent: item!.parent,
//       name: item!.name,
//       parentId: item!.parentId ?? null,
//     };

//     if (!isEditMode && item!.id != 0) {
//       config.data.parentId = item!.id;
//     }
//     // }

//     var dialogRes = this.dialog.open(AdminProvinceFormComponent, config);
//     // var dialogRes = this.dialog.open(SaveSubjectComponent, config);
//   }
//   TREE_DATA3: ProvinceSelectableNode[] = [];
// }

// /** Flat node with expandable and level information */
// interface ExampleFlatNode {
//   expandable: boolean;
//   name: string;
//   id: number;
//   parent: ProvinceSelectableNode[] | undefined;
//   parentId: number | null;
//   level: number;
// }
