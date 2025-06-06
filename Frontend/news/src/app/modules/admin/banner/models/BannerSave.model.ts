export class BannerSave {
  constructor(
    public title: string,
    public description: string,
    public img: string,
    public newsId: number,
    public categoryId: number,
    public id?: number
  ) {}
}
