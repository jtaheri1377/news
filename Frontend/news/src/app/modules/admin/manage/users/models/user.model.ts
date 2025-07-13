export class User {
  constructor(
    public name: string,
    public family: string,
    public phone1: string,
    public socialMedia1: string,
    public address: string,
    public email: string,
    public nationalCode: string,
    public isActive: boolean,
    public roleIds: number[],
    public roles: any[],
    public phone2?: string,
    public socialMedia2?: string,
    public id?: number
  ) {}
}

export class UserSave {
  constructor(
    public name: string,
    public family: string,
    public phone1: string,
    public socialMedia1: string,
    public address: string,
    public email: string,
    public nationalCode: string,
    public password: string,
    public isActive: boolean,
    public roleIds: number[],
    public phone2?: string,
    public socialMedia2?: string,
    public id?: number
  ) {}
}
