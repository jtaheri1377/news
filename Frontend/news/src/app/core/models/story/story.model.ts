import { Media } from "../media/media.model";

 
export class Story {
  constructor(
    public id: number,
    public fileUrl: string,
    public title: string,
    public description: string,
    public likes: number,
    public dislikes: number,
    public hearts: number,
    public reviews: number,
    public province: string,
    public publishedDate: Date,
    public medias: Media[],
  ) {}
}
