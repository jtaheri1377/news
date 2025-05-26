import { SiteFileType } from '../../../../core/Enums/site-file-type';
export class SiteFile {
  constructor(
    public fileUrl: string,
    public fileType: string,
    public extension: string,
    public alt: string, 
    public uploadDate: Date,
    public link: string,
    public siteFileType: SiteFileType,
    public id?: number
  ) {}
}


