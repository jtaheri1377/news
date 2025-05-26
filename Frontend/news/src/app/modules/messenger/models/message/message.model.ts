import { FileUploadPreview, FileUploadResponse } from "../../file-browser/services/upload.service";

export class Message {
  constructor(
    public id: number,
    public message: string,
    public createdOn: string | Date | number,
    public editedOn: string | Date | number | null,
    public isSeen: boolean,
    public media:FileUploadResponse[]
  ) {}
}
