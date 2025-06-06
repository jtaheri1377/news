export class StorySave {
  constructor(
    public title: string,
    public provinceId: number,
    public mediaIds: number[],
    public description?: string,
    public id?: number | null
  ) {}
}
