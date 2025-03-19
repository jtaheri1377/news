import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    // const req = new HttpRequest('POST', , formData, {
    //   reportProgress: true,
    //   observe: 'events'
    // });

    this.http
      .post('https://your-api.com/FileUpload/upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(
              (100 * event.loaded) / (event.total ?? 1)
            );
            console.log(`Progress: ${percentDone}%`);
          } else if (event.type === HttpEventType.Response) {
            console.log('File uploaded successfully!', event.body);
          }
        },
        (error) => {
          console.error('Upload failed:', error);
        }
      );
  }
}
