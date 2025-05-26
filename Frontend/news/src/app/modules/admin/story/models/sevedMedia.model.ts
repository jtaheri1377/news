export class SavedMedia {
  constructor(
    public fileUrl: string,
    public fileType: string,
    public alt?: string,
    public duration?: string,
    public thumbnailUrl?: string,
    public id?: number
  ) {}
}
