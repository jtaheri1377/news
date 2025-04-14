export class StorySave {
  constructor(
    public title: string,
    public description: string,
    public provinceId: number,
    public mediaIds: number[],
    public id?: number
  ) {}
}
