// import {
//   AfterViewChecked,
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
//   Component,
//   ElementRef,
//   HostListener,
//   model,
//   signal,
//   ViewChild,
// } from '@angular/core';

// import twemoji from 'twemoji';
// import { i18nDataImoje } from './emoji-i18n/emojiI18n';

// @Component({
//   selector: 'app-message-input',
//   standalone: false,
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   templateUrl: './message-input.component.html',
//   styleUrl: './message-input.component.scss',
// })
// export class MessageInputComponent implements AfterViewChecked {
//   readonly message = model('');
//   readonly inputRows = signal(1);
//   @ViewChild('messageBox') messageBox!: ElementRef;
//   @ViewChild('emojiPicker') emojiPicker!: ElementRef;
//   @HostListener('click')
//   showEmojiPicker = false; // نمایش/عدم نمایش انتخابگر ایموجی

//   constructor(private cdr: ChangeDetectorRef) {}

//   ngAfterViewChecked(): void {
//     this.cdr.markForCheck();
//   }

//   checkInputRows(event: Event) {
//     const inputElement = event.target as HTMLTextAreaElement;
//     var elementRows = inputElement.value.split('\n').length;
//     if (elementRows < 7) this.inputRows.set(elementRows);
//     if (elementRows > 7) this.inputRows.set(7);
//   }
//   emojeTranslates = i18nDataImoje;

//   addEmoji(event: any) {
//     const emoji = event.emoji.native;
//     const textarea = this.messageBox.nativeElement as HTMLTextAreaElement;
//     const start = textarea.selectionStart;
//     const end = textarea.selectionEnd;
//     const text = this.message();

//     // درج ایموجی در موقعیت کرسر
//     const newText = text.slice(0, start) + emoji + text.slice(end);

//     // به‌روزرسانی مقدار `message`
//     this.message.set(newText);

//     // تنظیم مجدد موقعیت کرسر پس از درج ایموجی
//     setTimeout(() => {
//       textarea.focus();
//       textarea.setSelectionRange(start + emoji.length, start + emoji.length);
//     }, 0);
//   }

//   onInputChange(event: any) {
//     this.convertEmojisToSVG();
//   }

//   convertEmojisToSVG() {
//     const parsedText = twemoji.parse(this.message(), {
//       folder: 'svg',
//       ext: '.svg',
//       className: 'emoji-large',
//     });

//     this.message.set(parsedText);
//   }

//   @HostListener('document:click', ['$event'])
//   onClickOutside(event: Event) {
//     if (
//       this.showEmojiPicker &&
//       this.emojiPicker &&
//       !this.emojiPicker.nativeElement.contains(event.target)
//     ) {
//       this.showEmojiPicker = false;
//     }
//   }

//   adjustTextareaHeight() {
//     const textarea = this.messageBox.nativeElement as HTMLTextAreaElement;
//     textarea.style.height = 'auto';
//     textarea.style.height = `${textarea.scrollHeight}px`;
//   }

// }

import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  model,
  inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import twemoji from 'twemoji';
import { i18nDataImoje } from './emoji-i18n/emojiI18n';
import { MatDialog } from '@angular/material/dialog';
import { FileUpload } from '../../file-browser/services/upload.service';
import { FileUploadPreviewComponent } from '../../file-browser/components/file-upload-preview/file-upload-preview.component';

@Component({
  standalone: false,
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  messageForm: FormGroup = new FormGroup({
    messageControl: new FormControl(''),
  });
  showEmojiPicker = false;
  emojeTranslates = i18nDataImoje;
  readonly inputRows = model(1);

  @ViewChild('messageBox') messageBox!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('emojiPicker') emojiPicker!: ElementRef<HTMLDivElement>;
  readonly dialog = inject(MatDialog);

  constructor(private cdr: ChangeDetectorRef) {}

  checkInputRows(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    var elementRows = inputElement.value.split('\n').length;
    if (elementRows < 7) this.inputRows.set(elementRows);
    if (elementRows > 7) this.inputRows.set(7);
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native;
    const textarea = this.messageBox.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      this.messageForm.get('messageControl')!.value.slice(0, start) +
      emoji +
      this.messageForm.controls['messageControl']!.value.slice(end);

    this.messageForm.controls['messageControl'].setValue(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  }

  convertEmojisToSVG() {
    setTimeout(() => {
      this.messageBox.nativeElement.innerHTML = twemoji.parse(
        this.messageForm.controls['messageControl']!.value ?? '',
        {
          folder: 'svg',
          ext: '.svg',
          className: 'emoji-large',
        }
      );
    }, 0);
  }

  onMessageKeydown(event: KeyboardEvent) {}

  onFileSelected(value: FileUpload[]) {
    console.log(value);
    this.openDialog(value);
  }

  openDialog(files: FileUpload[]): void {
    debugger;
    const dialogRef = this.dialog.open(FileUploadPreviewComponent, {
      data: {
        files: files,
        message: this.messageForm.controls['messageControl']!.value ?? '',
      },
      disableClose: true,
      maxHeight: '95vh',
      // width: '99vw',
      // height: '95vh',
      // {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.messageForm.controls['messageControl'].setValue(result.message);
        this.onSubmit();
        // console.log(result);
        // this.animal.set(result);
      }
    });
  }

  onSubmit() {
    if (
      this.messageForm.value['messageControl'] == undefined ||
      this.messageForm.value['messageControl'].trim() == ''
    )
      return
  }

  // بستن خودکار `emojiPicker` هنگام کلیک بیرون
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.showEmojiPicker &&
      this.emojiPicker
      // !this.emojiPicker.nativeElement.contains(event.target)
    ) {
      // this.showEmojiPicker = false;
      this.cdr.markForCheck();
    }
  }
}
