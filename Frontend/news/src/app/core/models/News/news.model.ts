import { Meeting } from "../meeting/meeting.model";
import { NewsItem } from "./newsItem.model";

export class NewsResponse {
    constructor(
        public news:NewsItem[],
        public hasMore:boolean
    ){}
}