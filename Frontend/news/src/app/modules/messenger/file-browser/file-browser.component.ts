import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  ContentChild,
} from '@angular/core';
import {
  FileType,
  FileUploadFull,
  FileUploadPreview,
  UploadService,
} from './services/upload.service';

@Component({
  selector: 'app-file-browser',
  standalone: false,
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss'],
})
export class FileBrowserComponent implements OnInit, AfterViewInit {
  @Input() fileType: FileType = 'All';
  @ViewChild('fileInput', { static: true })
  fileInputRef!: ElementRef<HTMLInputElement>;
  @ContentChild('fileOpen', { static: true })
  fileOpenRef!: ElementRef<HTMLElement>;

  @Output() fileSelect = new EventEmitter<FileUploadFull>();

  selectedFiles: FileUploadPreview[] = [];
  rawFiles: File[] = [];
  acceptedFileTypes: string = '';

  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
    this.acceptedFileTypes = this.uploadService.getAcceptedFileTypes(
      this.fileType
    );
  }

  ngAfterViewInit(): void {
    this.fileOpenRef?.nativeElement.addEventListener('click', () =>
      this.triggerFileInput()
    );
  }

  private triggerFileInput(): void {
    this.fileInputRef?.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const files = (event.target as HTMLInputElement)?.files;
    if (!files?.length) return;

    this.selectedFiles = [];
    this.rawFiles = [];

    Array.from(files).forEach((file) => {
      if (!this.uploadService.isFileAllowed(file.type, this.fileType)) {
        console.warn(`فایل "${file.name}" مجاز نیست.`);
        return;
      }

      this.selectedFiles.push({
        url: URL.createObjectURL(file),
        type: file.type,
        name: file.name,
      });

      this.rawFiles.push(file);
      console.log('فایل خام :  ', file);
    });

    const fullFiles: FileUploadFull = {
      preview: this.selectedFiles,
      server: this.rawFiles,
    };
    this.fileSelect.emit(fullFiles);
  }
}
