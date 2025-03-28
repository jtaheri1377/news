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
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import twemoji from 'twemoji';
import { i18nDataImoje } from './emoji-i18n/emojiI18n';
import { MatDialog } from '@angular/material/dialog';
import { FileUpload } from '../../file-browser/services/upload.service';
import { FileUploadPreviewComponent } from '../../file-browser/components/file-upload-preview/file-upload-preview.component';
import { UserMessage } from '../../models/userMassage/userMessage.model';
import { MessengerService } from '../../services/messenger.service';
import { Message } from '../../models/message/message.model';

@Component({
  standalone: false,
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent implements AfterViewInit {
  messageForm: FormGroup = new FormGroup({
    messageControl: new FormControl(''),
  });
  mediaFiles: FileUpload[] = [];
  showEmojiPicker = false;
  isEditMode: boolean = false;
  emojeTranslates = i18nDataImoje;
  readonly inputRows = model(1);
  @ViewChild('emojiButton') emojiButton!: ElementRef;
  @ViewChild('emojiPicker') emojiPicker!: ElementRef<HTMLElement>;

  @ViewChild('messageBox') messageBox!: ElementRef<HTMLTextAreaElement>;
  readonly dialog = inject(MatDialog);

  constructor(
    private cdr: ChangeDetectorRef,
    private service: MessengerService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.adjustTextareaHeight(); // اجرای تابع هنگام بارگذاری اولیه
    }, 100);
  }

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

  onFileSelected(value: FileUpload[]) {
    console.log(value);
    this.openDialog(value);
  }

  openDialog(files: FileUpload[]): void {
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
        this.mediaFiles = result.files;
        this.onSubmit();
      }
    });
  }

  onMessageKeydown(event: KeyboardEvent) {
    if (event.shiftKey && event.key === 'Enter') {
      return; // به خط بعدی منتقل شود
    } else if (event.key === 'Enter') {
      event.preventDefault(); // جلوگیری از ایجاد خط جدید
      this.onSubmit();
    }
  }

  adjustTextareaHeight() {
    const textarea = this.messageBox.nativeElement;

    // ارتفاع را به کمترین مقدار ممکن تنظیم کن
    textarea.style.height = '0px';

    // مقدار دقیق line-height را دریافت کن
    const computedStyle = window.getComputedStyle(textarea) || 24;
    const lineHeight = parseInt(computedStyle.lineHeight, 10) || 20; // مقدار پیش‌فرض ۲۰ پیکسل در صورت نامعتبر بودن

    // محاسبه حداقل و حداکثر ارتفاع
    const minHeight = lineHeight; // حداقل ارتفاع = یک خط
    const maxHeight = lineHeight * 7; // حداکثر ارتفاع = ۷ خط

    // مقدار ارتفاع جدید را تنظیم کن (با محدودیت)
    const newHeight = Math.min(
      Math.max(textarea.scrollHeight, minHeight),
      maxHeight
    );
    textarea.style.height = `${newHeight}px`;
  }

  onSubmit() {
    const _message = this.messageForm.value['messageControl'];
    if (this.mediaFiles.length == 0 && (!_message || _message.trim() === ''))
      return;

    const message: Message = {
      id: Date.now(),
      message: _message,
      createdOn: new Date().getHours() + ':' + new Date().getMinutes(),
      editedOn: null,
      isSeen: false,
      media: this.mediaFiles,
    };
    this.mediaFiles = [];
    this.messageForm.controls['messageControl'].setValue(''); // پاک کردن مقدار
    this.adjustTextareaHeight(); // بازگرداندن ارتفاع به حالت اولیه

    this.service.addNewMessage(message);
  }

  toggleEmojiPicker() {
    // setTimeout(() => {
    this.showEmojiPicker = !this.showEmojiPicker;
    // }, 0);
  }

  // بستن خودکار `emojiPicker` هنگام کلیک بیرون
  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: Event) {
  //   setTimeout(() => {

  //     debugger;
  //     if (
  //       this.showEmojiPicker &&
  //       this.emojiPicker &&
  //       this.emojiPicker.nativeElement.contains(event.target as Node)
  //       // &&

  //     ) {
  //       this.showEmojiPicker = false;
  //       this.cdr.markForCheck();
  //     }
  //   }, 0);
  // }
}
