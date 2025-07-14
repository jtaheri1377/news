import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { NotifService } from '../../../../../../shared/services/notif.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { AdminPermissionService } from '../../services/admin-permission.service';
import { PermissionNode } from '../../models/permissionNode.model';
import { AdminPermissionFormComponent } from '../admin-permission-form/admin-permission-form.component';

// Define the interface for the flattened tree node, which is used by MatTreeFlattener
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  title: string;
  id: number;
  isSelected: boolean;
  parent: PermissionNode[] | undefined;
  parentId: number | null;
  level: number;
}

// Define the interface for the output data structure
interface SelectionGroup {
  selectedIds: number[];
  unselectedIds: number[];
}

@Component({
  selector: 'app-permission-list',
  standalone: false,
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss',
})
export class PermissionListComponent implements OnInit, OnChanges {
  @Input() items: PermissionNode[] = [];
  @Input() selectable: boolean = true;
  @Input() searchable: boolean = true;
  @Input() expandAll: boolean = false;
  @Input() showActions: boolean = true;

  // New Input: Array of IDs that should be selected in the tree
  @Input() selectedPermissionIds: number[] = [];

  // Output event to emit the grouped selected and unselected IDs
  @Output() selectionChange = new EventEmitter<number[]>(); // Changed back to SelectionGroup as per previous request
  @Output() editNode = new EventEmitter<PermissionNode>();
  @Output() deleteNode = new EventEmitter<PermissionNode>();

  filteredItems: PermissionNode[] = [];
  searchQuery: string = '';
  allSelected: boolean = false;
  isLoading: boolean = false;
  treenode = new PermissionNode('', '', 0, false, null);
  allIndeterminate: boolean = false;

  private _transformer = (node: PermissionNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      title: node.title,
      id: node.id,
      parent: node.parent,
      isSelected: node.isSelected,
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

  ngOnInit(): void {
    this.getAllPermissions();
    this.service.PermissionListUpdate$.subscribe(() => {
      this.getAllPermissions();
    });
  }

  /**
   * Lifecycle hook that is called when any data-bound input property of a directive changes.
   * Used here to react to changes in `selectedPermissionIds` input.
   * @param changes Object containing current and previous property values.
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Check if selectedPermissionIds input has changed and if permissions data is already loaded
    if (changes['selectedPermissionIds'] && this.permissions.length > 0) {
      const newSelectedIds = changes['selectedPermissionIds'].currentValue as number[];
      this.applySelectionFromInput(newSelectedIds);
    }
  }

  /**
   * Fetches all permissions from the service and updates the tree data.
   */
  getAllPermissions() {
    this.service.getTree().subscribe((res: PermissionNode[]) => {
      this.permissions = res;
      this.TREE_DATA3 = res;
      // Store current expansion state before updating dataSource
      const expandedNodeIds = new Set<number>();
      this.treeControl.expansionModel.selected.forEach(node => expandedNodeIds.add(node.id));

      this.dataSource.data = this.TREE_DATA3; // Update the data source for the tree

      // Restore expansion state
      this.treeControl.dataNodes.forEach(node => {
        if (expandedNodeIds.has(node.id)) {
          this.treeControl.expand(node);
        }
      });

      console.log('Permissions loaded:', this.TREE_DATA3);

      // After loading data, if there are initial selectedPermissionIds, apply them
      if (this.selectedPermissionIds && this.selectedPermissionIds.length > 0) {
        this.applySelectionFromInput(this.selectedPermissionIds);
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
    this.treeControl.expansionModel.selected.forEach(node => expandedNodeIds.add(node.id));

    // 2. Reset all existing selections in the tree to ensure a clean state
    this.resetAllSelections(this.permissions);

    // 3. Mark nodes as selected based on the input IDs
    idsToSelect.forEach(id => {
      const nodeToSelect = this.findNodeInTree(this.permissions, id);
      if (nodeToSelect) {
        nodeToSelect.isSelected = true;
      }
    });

    // 4. After all direct selections are applied, re-evaluate and update parent selections
    const allFlatNodes = this.treeControl.dataNodes;
    allFlatNodes.forEach(flatNode => {
      const originalNode = this.findNodeInTree(this.permissions, flatNode.id);
      if (originalNode) {
        this.updateParentSelection(originalNode);
      }
    });

    // 5. Refresh the data source to reflect the changes in the UI
    this.dataSource.data = [...this.permissions];

    // 6. Restore expansion state
    this.treeControl.dataNodes.forEach(node => {
      if (expandedNodeIds.has(node.id)) {
        this.treeControl.expand(node);
      }
    });

    // 7. Emit the updated selection state to the parent component
    this.emitCurrentSelection();
  }

  /**
   * Resets the `isSelected` property of all nodes in the tree to `false`.
   * @param nodes The array of PermissionNodes to reset.
   */
  private resetAllSelections(nodes: PermissionNode[]): void {
    nodes.forEach(node => {
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
    this.treeControl.expansionModel.selected.forEach(expandedNode => expandedNodeIds.add(expandedNode.id));

    // 2. Update the selection state of the clicked node and its descendants/ancestors
    const originalNode = this.findNodeInTree(this.permissions, node.id);

    if (originalNode) {
      originalNode.isSelected = isSelected;
      this.updateChildrenSelection(originalNode, isSelected);
      this.updateParentSelection(originalNode);
    }

    // 3. Refresh the data source to reflect the changes in the UI
    this.dataSource.data = [...this.permissions];

    // 4. Restore expansion state
    this.treeControl.dataNodes.forEach(n => {
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
  private updateChildrenSelection(node: PermissionNode, isSelected: boolean): void {
    if (node.children) {
      node.children.forEach(child => {
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
  private updateParentSelection(node: PermissionNode): void {
    if (node.parentId !== null && node.parentId !== undefined) {
      const parentNode = this.findNodeInTree(this.permissions, node.parentId);

      if (parentNode) {
        const allChildrenSelected = parentNode.children?.every(child => child.isSelected);
        const anyChildSelected = parentNode.children?.some(child => child.isSelected);

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
   * Finds a PermissionNode in the hierarchical tree structure by its ID.
   * @param nodes The array of PermissionNodes to search within.
   * @param id The ID of the node to find.
   * @returns The found PermissionNode or undefined if not found.
   */
  private findNodeInTree(nodes: PermissionNode[], id: number): PermissionNode | undefined {
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
   * @param node The PermissionNode to check.
   * @returns True if the node or any of its descendants are selected, false otherwise.
   */
  private isNodeOrDescendantSelected(node: PermissionNode): boolean {
    if (node.isSelected) {
      return true;
    }
    if (node.children && node.children.length > 0) {
      return node.children.some(child => this.isNodeOrDescendantSelected(child));
    }
    return false;
  }

  /**
   * Helper function to recursively flatten a list of PermissionNodes.
   * Used to create a flat list of all nodes for processing.
   * @param nodes The array of PermissionNodes to flatten.
   * @returns A flat array of all PermissionNodes in the subtree.
   */
  private getFlatNodesRecursive(nodes: PermissionNode[]): PermissionNode[] {
    return nodes.reduce((acc: PermissionNode[], node: PermissionNode) => {
      acc.push(node);
      if (node.children) {
        acc.push(...this.getFlatNodesRecursive(node.children));
      }
      return acc;
    }, []);
  }

  /**
   * Collects and groups the IDs of all nodes into 'selected' and 'unselected' categories.
   * A node is considered 'selected' if itself or any of its descendants are selected.
   * @param nodes The array of PermissionNodes (the entire tree) to process.
   * @returns An object containing two arrays: `selectedIds` and `unselectedIds`.
   */
  private getGroupedSelectionStatus(nodes: PermissionNode[]): SelectionGroup {
    const allNodes: PermissionNode[] = this.getFlatNodesRecursive(nodes); // Flatten the entire tree

    const selectedIds = new Set<number>();
    const unselectedIds = new Set<number>();

    allNodes.forEach(node => {
      if (this.isNodeOrDescendantSelected(node)) {
        selectedIds.add(node.id);
      } else {
        unselectedIds.add(node.id);
      }
    });

    return {
      selectedIds: Array.from(selectedIds),
      unselectedIds: Array.from(unselectedIds)
    };
  }

  /**
   * Emits the current state of the grouped selected and unselected IDs via the `selectionChange` Output.
   */
  private emitCurrentSelection(): void {
    const groupedStatus = this.getGroupedSelectionStatus(this.permissions);
    this.selectionChange.emit(groupedStatus.selectedIds); // Emitting the full SelectionGroup object
    console.log('Emitting grouped selection status:', groupedStatus);
  }

  /**
   * Handles the deletion of a permission subject.
   * @param id The ID of the permission to delete.
   */
  deleteSubject(id: number) {
    const dialogRes = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'حذف دسترسی',
        message: 'آیا از حذف دسترسی مورد نظر اطمینان دارید؟',
      },
    });
    dialogRes.afterClosed().subscribe((answer: any) => {
      if (answer) {
        this.service.delete(id).subscribe({
          next: (res: any) => {
            this.notif.success('دسترسی مورد نظر حذف شد');
            this.getAllPermissions();
          },
          error: (err) => {
            this.notif.error('خطا در حذف دسترسی');
            console.error('Error deleting permission:', err);
          }
        });
      }
    });
  }

  /**
   * Opens the form to save (add/edit) a permission.
   * @param item The permission node to edit or use as a parent for a new node.
   * @param isEditMode True if in edit mode, false for adding a new node.
   */
  savePermission(item: PermissionNode, isEditMode: boolean) {
    let config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      isEditMode: isEditMode,
      id: item!.id,
      parent: item!.parent,
      name: item!.name,
      title: item!.title,
      parentId: item!.parentId ?? null,
    };

    if (!isEditMode && item!.id !== 0) {
      config.data.parentId = item!.id;
    }

    this.dialog.open(AdminPermissionFormComponent, config);
  }

  TREE_DATA3: PermissionNode[] = [];
}
