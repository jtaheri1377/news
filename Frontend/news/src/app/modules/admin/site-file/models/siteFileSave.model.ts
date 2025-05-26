import { SiteFileType } from '../../../../core/Enums/site-file-type';
export class SiteFileSave {
  constructor(
    public fileUrl: string,
    public link: string,
    public siteFileType: SiteFileType,
    public id?: number
  ) {}
}

