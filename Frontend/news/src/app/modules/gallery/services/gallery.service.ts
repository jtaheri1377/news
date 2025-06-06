import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LazyLoadResponse } from '../../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { Gallery } from '../../../core/models/gallery/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  Url = environment.ApiEndPoint;
  constructor(private http: HttpClient) {}

  getGallery(skip:number=0,take:number=10): Observable<LazyLoadResponse<Gallery>> {
   return this.http.get<LazyLoadResponse<Gallery>>(`${this.Url}Media/GetGallery?skip=${skip}&take=${take}`);
  }
}
