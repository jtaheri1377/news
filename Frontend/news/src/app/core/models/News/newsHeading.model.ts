import { Meeting } from "../meeting/meeting.model";
import { NewsItem } from "./newsItem.model";

export class NewsHeading {
    constructor(
        public ctgId: number,
        public text:string
    ){}
}