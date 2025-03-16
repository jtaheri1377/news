import { Meeting } from "../meeting/meeting.model";
import { NewsItem } from "../News/newsItem.model";

export class LazyLoadResponse<T> {
    constructor(
        public list:T[],
        public hasMore:boolean
    ){}
}