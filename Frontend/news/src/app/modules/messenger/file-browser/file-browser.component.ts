import { EventEmitter } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ContentChild,
  contentChild,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FileType, FileUpload, UploadService } from './services/upload.service';

@Component({
  selector: 'app-file-browser',
  standalone: false,

  templateUrl: './file-browser.component.html',
  styleUrl: './file-browser.component.scss',
})
export class FileBrowserComponent implements OnInit, AfterViewInit {
  @Input() fileType: FileType = 'all'; // نوع فایل‌های مجاز
  @ViewChild('fileInput') fileInput!: ElementRef<any>;
  @ContentChild('fileOpen', { static: true })
  fileOpen!: ElementRef<HTMLButtonElement>;
  selectedFiles: FileUpload[] = [];
  @Output('fileSelect') fileSelect = new EventEmitter<FileUpload[]>();

  acceptedFileTypes: string = '';

  constructor(private service: UploadService) {}

  ngOnInit() {
    // limit of type files for upload
    this.acceptedFileTypes = this.service.getAcceptedFileTypes(this.fileType);
  }

  ngAfterViewInit(): void {
    this.fileOpen.nativeElement.addEventListener('click', () => {
      this.fileInput.nativeElement.click();
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.selectedFiles = [];

    Array.from(input.files).forEach((file) => {
      if (!this.service.isFileAllowed(file.type, this.fileType)) {
        console.warn('نوع فایل انتخاب‌ شده مجاز نیست!');
        return;
      }

      const url = URL.createObjectURL(file);

      this.selectedFiles.push({ url, type: file.type, name: file.name });
    });
    this.fileSelect.next(this.selectedFiles);
  }
}
