import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiteFileType } from '../../../core/Enums/site-file-type';
import { SiteFileSave } from '../../admin/site-file/models/siteFileSave.model';
import { SiteFile } from '../../admin/site-file/models/siteFile.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  getImage(siteFileType:SiteFileType):Observable<SiteFile> {
    return this.http.get<SiteFile>(
      `${this.Url}siteFile/Get/${siteFileType}`
    );
  }
}
