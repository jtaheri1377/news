import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  model,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { UserMessage } from '../../models/userMassage/userMessage.model';
import { MessengerService } from '../../services/messenger.service';
import { Subscription } from 'rxjs';
import { LazyLoadResponse } from '../../../../core/models/lazyLoadResponse/LazyLoadResponse.model';

@Component({
  selector: 'app-message-wrapper',
  standalone: false,

  templateUrl: './message-wrapper.component.html',
  styleUrl: './message-wrapper.component.scss',
})
export class MessageWrapperComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('bottom') bottom!: ElementRef;
  @ViewChild('lastMessage') lastMessage!: ElementRef;
  readonly currentUserId = model('abc');
  subs: Subscription[] = [];
  isLoading: boolean = false;
  hasMore: boolean = false;
  messages = signal<UserMessage[]>([]);
  constructor(private service: MessengerService) {}

  ngOnInit(): void {
    this.service.messagesUpdated$.subscribe(() => {
      this.fetchMessages();
    });
    this.fetchMessages();
  }

  fetchMessages() {
    this.isLoading = true;
    var sub = this.service
      .getMessages(this.messages.length, 30)
      .subscribe((result: LazyLoadResponse<UserMessage>) => {
        // this.messages.set([...this.messages(), ...result.list]);
        this.messages.set([...result.list]);
        this.hasMore = result.hasMore;
        this.hasMore = result.hasMore;
        this.isLoading = false;
        setTimeout(() => {
          this.scrollTo(this.lastMessage.nativeElement, true);
        }, 100);
      });
    this.subs.push(sub);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollTo(this.lastMessage.nativeElement, false);
    }, 100);
  }

  scrollTo(element: any, smooth?: boolean) {
    if (smooth) element.scrollIntoView({ behavior: 'smooth' });
    else element.scrollIntoView();
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
