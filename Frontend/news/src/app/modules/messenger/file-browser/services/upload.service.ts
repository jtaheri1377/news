import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type FileType =
  | 'Media'
  | 'non-media'
  | 'Image'
  | 'Video'
  | 'Audio'
  | 'All';

export interface FileUploadResponse {
  id: number;
  fileUrl: string;
  fileType: FileType;
  fileName: string;
  fileSize: number;
  extension: string;
  uploadDate: string;
}
export interface FileUpload {
  url: string;
  type: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  isImage(fileType: string): boolean {
    return fileType.startsWith('Image');
  }

  isVideo(fileType: string): boolean {
     
    return fileType.startsWith('Video');
  }

  public isAudio(fileType: string): boolean {
    return fileType.startsWith('Audio');
  }

  isMedia(fileType: string): boolean {
    return (
      this.isImage(fileType) || this.isVideo(fileType) || this.isAudio(fileType)
    );
  }

  isFileAllowed(fileType: string, allowedType: FileType): boolean {
    const isMedia =
      this.isImage(fileType) ||
      this.isVideo(fileType) ||
      this.isAudio(fileType);
    if (allowedType === 'Media' && !isMedia) return false;
    if (allowedType === 'non-media' && isMedia) return false;
    if (allowedType === 'Image' && !this.isImage(fileType)) return false;
    if (allowedType === 'Video' && !this.isVideo(fileType)) return false;
    if (allowedType === 'Audio' && !this.isAudio(fileType)) return false;
    return true;
  }

  getAcceptedFileTypes(uploadingFileType: FileType) {
    const fileTypesMap: Record<FileType, string> = {
      Media: 'image/*,video/*,audio/*',
      'non-media': '.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar,.csv',
      Image: 'image/*',
      Video: 'video/*',
      Audio: 'audio/*',
      All: '',
    };
    return fileTypesMap[uploadingFileType];
  }

  uploadFiles(files: File[]) {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    // if (alt) {
    //   formData.append('alt', alt); // 👈 ارسال رشته ALT هم اگه خواستی
    // }+
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log('✅ File:', key, value.name, value.type, value.size);
      } else {
        console.log('✅ Other:', key, value);
      }
    }

    debugger;
    return this.http.post(
      'https://localhost:5000/FileUpload/upload-multiple',
      formData,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
}
