import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

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
export interface FileUploadPreview {
  url: string;
  type: string;
  name: string;
}

export interface FileUploadFull {
  preview: FileUploadPreview[];
  server: File[];
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}
  Url = environment.ApiEndPoint;

  isImage(fileType: string): boolean {
    return fileType.startsWith('Image') || fileType.startsWith('image');
  }

  isVideo(fileType: string): boolean {
    return fileType.startsWith('Video') || fileType.startsWith('video');
  }

  public isAudio(fileType: string): boolean {
    return fileType.startsWith('Audio') || fileType.startsWith('audio');
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
      'non-media': '.pdf,.doc,.docx,.xls,.xlsx,.txt',
      // 'non-media': '.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar,.csv',
      Image: 'image/*',
      Video: 'video/*',
      Audio: 'audio/*',
      All: 'image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt',
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

    return this.http.post(`${this.Url}FileUpload/upload-multiple`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
