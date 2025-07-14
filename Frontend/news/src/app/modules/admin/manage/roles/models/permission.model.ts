export class Permission {
  constructor(
    public name: string,
    public title: string,
    public isSelected: boolean,
    public children: Permission[],
    public parentId?: number,
    public id?: number
  ) {}
}

export class PermissionSave {
  constructor(
    public name: string,
    public title: string,
    public isSelected: boolean,
    public parentId?: number,
    public id?: number
  ) {}
}

// export class PermissionSave {
//   constructor(
//     public name: string,
//     public title: string,
//     public isSelected: boolean,
//     public permissions: any[],
//     public parentId?: number,
//     public id?: number
//   ) {}
// }

 