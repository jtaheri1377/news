import { Permission } from './role.model copy';
export class PermissionNode {
  constructor(
    public name: string,
    public title: string,
    public id: number,
    public parentId: string | null,
    public parent?: PermissionNode[],
    public children?: PermissionNode[]
  ) {}
}


