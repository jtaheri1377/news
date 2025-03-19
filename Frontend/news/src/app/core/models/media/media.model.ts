export class Media {
  constructor(
    public id: number,
    public fileUrl: string,
    public thumbnailUrl: string,
    public fileType: string,
    public duration: string,
    public alt: string,
    public uploadDate: Date
  ) {}
}
