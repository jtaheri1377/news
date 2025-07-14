export class PermissionNode {
  constructor(
    public name: string,
    public title: string,
    public id: number,
    public isSelected: boolean,
    public parentId: number | null,
    public parent?: PermissionNode[],
    public children?: PermissionNode[]
  ) {}
}
