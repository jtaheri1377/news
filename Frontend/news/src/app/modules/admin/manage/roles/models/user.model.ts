export class Role {
  constructor(
    public name: string,
    public permissions: any[],
    public id?: number
  ) {}
}


export class RoleSave {
  constructor(
    public name: string,
    public permissionIds: number[],
    public id?: number
  ) {}
}
