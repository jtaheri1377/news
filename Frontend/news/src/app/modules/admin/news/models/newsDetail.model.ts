import { Media } from "../../../../core/models/media/media.model";

export class NewsDetail {
  constructor(
    public title: string,
    public description: string,
    public studyTime: string,
    public content: string,
    public reviews: number,
    public img: string,
    public province: string,
    public medias: Media[],
    public publishedDate: string | Date,
    public subject: string,
    public subjectId: number,
    public id?: number
  ) {}
}
