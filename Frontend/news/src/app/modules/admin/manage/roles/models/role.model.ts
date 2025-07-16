export class Role {
  constructor(
    public name: string,
    public provinceIds: number[],
    public permissionIds: number[],
    public id?: number
  ) {}
}


export class RoleSave {
  constructor(
    public name: string,
    public permissionIds: number[],
    public provinceIds: number[],
    public id?: number
  ) {}
}
