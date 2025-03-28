import {
  AfterViewInit,
  Component,
  HostListener,
  model,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Message } from '../../../models/message/message.model';
import { UserMessage } from '../../../models/userMassage/userMessage.model';
import emojiRegex from 'emoji-regex';
import { MessengerService } from '../../../services/messenger.service';
import { Subscription } from 'rxjs';
import { CdkMenu, CdkMenuItem, CdkContextMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'app-message-item',
  standalone: false,

  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.scss',
})
export class MessageItemComponent implements AfterViewInit, OnDestroy {
  readonly item = model<UserMessage | null>(null);
  readonly currentUserId = model('');
  selectedMessages: number[] = [];
  subs: Subscription[] = [];
  isSelecting: boolean = false;
  selectActionStarted: boolean = false;

  constructor(private service: MessengerService) {}

  ngAfterViewInit(): void {
    const sub1 = this.service.isSelecting.subscribe(
      (res) => (this.isSelecting = res)
    );
    const sub2 = this.service.selectedMessages.subscribe(
      (res) => (this.selectedMessages = res)
    );
    const sub3 = this.service.selectActionStarted.subscribe(
      (res) => (this.selectActionStarted = res)
    );
    this.subs.push(sub1, sub2, sub3);
  }

  // select action start
  onMouseDown(messageId: number) {
    this.service.selectActionStarted.next(true);
    if (this.selectedMessages.includes(messageId)) {
      this.selectedMessages = this.selectedMessages.filter(
        (id) => id !== messageId
      );
      this.service.isSelecting.next(false);
    } else {
      // if (this.selectedMessages.length == 0)
        // setTimeout(() => {
        //   if (!this.selectActionStarted) {
        this.service.isSelecting.next(true);
      this.selectedMessages.push(messageId);
      //   }
      // }, 500);
    }
    this.service.selectedMessages.next(this.selectedMessages);
  }

  onMouseMove(messageId: number) {
    if (!this.selectActionStarted) return;
    if (this.isSelecting && !this.selectedMessages.includes(messageId)) {
      this.selectedMessages.push(messageId);
    }
    if (!this.isSelecting) {
      this.selectedMessages = this.selectedMessages.filter(
        (id) => id !== messageId
      );
    }
    this.service.selectedMessages.next(this.selectedMessages);

    console.log('لیست انتخاب شده‌ها:', this.selectedMessages);
  }

  // select Action end
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: Event) {
    this.service.selectActionStarted.next(false);
    this.service.isSelecting.next(false);
    console.log('لیست انتخاب شده‌ها:', this.selectedMessages);
  }

  menuPosition = { x: '0px', y: '0px' };

  onOptionClick(option: string) {
    console.log(`گزینه انتخاب شده: ${option}`);
  }

  // emojis
  // isOnlyEmoji(text: string): boolean {
  //   const parsed = twemoji.parse(text);
  //   return (parsed && text.trim().replace(parsed, '').length) === 0;
  // }

  // getEmojiFontSize(text: string): string {
  //   if (!this.isOnlyEmoji(text.trim())) return ''; // اگر متن شامل حروف باشد، هیچ کلاسی اضافه نکن

  //   const emojiCount = (
  //     text.match(
  //       /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]+$/u
  //     ) || []
  //   ).length;

  //   if (emojiCount <= 3) return '!text-5xl'; // ایموجی کم → فونت بزرگ
  //   if (emojiCount <= 6) return '!text-4xl'; // ایموجی متوسط → فونت متوسط
  //   return '!text-3xl'; // ایموجی زیاد → فونت کوچک‌تر
  // }

  isOnlyEmoji(text: string): boolean {
    const regex = emojiRegex();
    return (
      regex.test(text.trim()) && text.trim().replace(regex, '').length === 0
    );
  }

  getEmojiFontSize(text: string): string {
    if (!this.isOnlyEmoji(text)) return '';
    const emojiCount = (text.match(emojiRegex()) || []).length;

    if (emojiCount == 1) return 'text-7xl';
    if (emojiCount <= 3) return 'text-5xl';
    if (emojiCount <= 6) return 'text-4xl';
    return 'text-3xl';
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
