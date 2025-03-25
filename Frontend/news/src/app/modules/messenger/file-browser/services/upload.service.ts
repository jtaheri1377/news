import { Injectable } from '@angular/core';

export type FileType =
  | 'media'
  | 'non-media'
  | 'image'
  | 'video'
  | 'audio'
  | 'all';

export interface FileUpload {
  url: string;
  type: string;
  name: string;
}


@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  isImage(fileType: string): boolean {
    return fileType.startsWith('image/');
  }

  isVideo(fileType: string): boolean {
    return fileType.startsWith('video/');
  }

  public isAudio(fileType: string): boolean {
    return fileType.startsWith('audio/');
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
    if (allowedType === 'media' && !isMedia) return false;
    if (allowedType === 'non-media' && isMedia) return false;
    if (allowedType === 'image' && !this.isImage(fileType)) return false;
    if (allowedType === 'video' && !this.isVideo(fileType)) return false;
    if (allowedType === 'audio' && !this.isAudio(fileType)) return false;
    return true;
  }

  getAcceptedFileTypes(uploadingFileType: FileType) {
    const fileTypesMap: Record<FileType, string> = {
      media: 'image/*,video/*,audio/*',
      'non-media': '.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar,.csv',
      image: 'image/*',
      video: 'video/*',
      audio: 'audio/*',
      all: '',
    };
    return fileTypesMap[uploadingFileType];
  }
}
