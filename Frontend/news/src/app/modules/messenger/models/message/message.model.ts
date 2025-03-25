export class Message {
  constructor(
    public id: number,
    public message: string,
    public createdOn: string,
    public editedOn: string,
    public isSeen: boolean
  ) {}
}
