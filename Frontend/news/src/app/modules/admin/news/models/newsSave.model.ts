export class NewsSave {
  constructor(
    public title: string,
    public description: string,
    public studyTime: string,
    public content: string,
    public img: string,
    public provinceId: number,
    public subjectId: number,
    public categoryIds: number[],
    public mediaIds: number[],
    public id?: number
  ) {}
}
