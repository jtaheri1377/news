export class Rule {
  constructor(
    public id: number,
    public fileUrl: string,
    public fileType: string,
    public extension: string,
    public alt: string, 
    public uploadDate: Date
  ) {}
}
