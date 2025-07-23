export class BannerSave {
  constructor(
    public title: string,
    public description: string,
    public img: string,
    public newsId: number,
    public categoryCode: number,
    public id?: number
  ) {}
}
