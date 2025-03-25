import { Message } from "../message/message.model";

export class UserMessage {
  constructor(
    public id: number,
    public userId: string,
    public nickname: string,
    public img: string,
    public messages: Message[]
  ) {}
}
 