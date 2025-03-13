export class NewsItem {
  constructor(
    public id: number,
    public img: string,
    public title: string,
    public description: string,
    public studyTime: string,
    public province: string,
    public reviews: string,
    public subject: string,
    public publishedDate: string,
  ) {}
}
