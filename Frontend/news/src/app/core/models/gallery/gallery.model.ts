import { Media } from "../media/media.model";

export class Gallery {
    constructor(
        public id:number,
        public title:string,
        public description:string,
        public studyTime:string,
        public img:string,
        public province:string,
        public reviews:number,
        public medias:Media[],
        public newsModelId?:number,
        public storyId?:number,
    ){}
}
 