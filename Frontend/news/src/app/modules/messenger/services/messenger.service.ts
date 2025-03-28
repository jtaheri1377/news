import { Injectable, model } from '@angular/core';
import { UserMessage } from '../models/userMassage/userMessage.model';
import { Message } from '../models/message/message.model';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { LazyLoadResponse } from '../../../core/models/lazyLoadResponse/LazyLoadResponse.model';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  private _messages: UserMessage[] = [
    {
      id: 0,
      userId: 'abc',
      img: 'https://localhost:5000/uploads/news4_34e6601f-9f69-4e14-a5aa-d7cfe65f9f78.jpg',
      nickname: 'امیرعلی',
      messages: [
        {
          id: 39,
          message: 'حسین جون سلام',
          createdOn: '2025-03-23T06:52:35.928Z',

          editedOn: '2025-03-23T06:52:35.928Z',
          media: [],
          isSeen: true,
        },
      ],
    },
    {
      id: 1,
      userId: 'javad',
      img: 'https://localhost:5000/uploads/test_e97cb503-e73c-47a4-ab13-7d3fe8c00845.jpg',
      nickname: 'جواد',
      messages: [
        {
          id: 49,
          message: 'سلام خوبی خداروشکر چه خبر',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
        {
          id: 59,
          message: 'چی کار می کنی؟😊',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
      ],
    },

    {
      id: 0,
      userId: 'abc',
      img: 'https://localhost:5000/uploads/news4_34e6601f-9f69-4e14-a5aa-d7cfe65f9f78.jpg',
      nickname: 'امیرعلی',
      messages: [
        {
          id: 69,
          message: 'حسین جون سلام',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: true,
        },
      ],
    },
    {
      id: 1,
      userId: 'javad',
      img: 'https://localhost:5000/uploads/test_e97cb503-e73c-47a4-ab13-7d3fe8c00845.jpg',
      nickname: 'جواد',
      messages: [
        {
          id: 79,
          message: 'سلام خوبی خداروشکر چه خبر',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
        {
          id: 89,
          message: 'چی کار می کنی؟😊',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
      ],
    },

    {
      id: 0,
      userId: 'abc',
      img: 'https://localhost:5000/uploads/news4_34e6601f-9f69-4e14-a5aa-d7cfe65f9f78.jpg',
      nickname: 'امیرعلی',
      messages: [
        {
          id: 99,
          message: 'حسین جون سلام',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: true,
        },
      ],
    },
    {
      id: 1,
      userId: 'javad',
      img: 'https://localhost:5000/uploads/test_e97cb503-e73c-47a4-ab13-7d3fe8c00845.jpg',
      nickname: 'جواد',
      messages: [
        {
          id: 109,
          message: 'سلام خوبی خداروشکر چه خبر',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
        {
          id: 119,
          message: 'چی کار می کنی؟😊',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
      ],
    },

    {
      id: 0,
      userId: 'abc',
      img: 'https://localhost:5000/uploads/news4_34e6601f-9f69-4e14-a5aa-d7cfe65f9f78.jpg',
      nickname: 'امیرعلی',
      messages: [
        {
          id: 129,
          message: 'حسین جون سلام',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: true,
        },
      ],
    },
    {
      id: 1,
      userId: 'javad',
      img: 'https://localhost:5000/uploads/test_e97cb503-e73c-47a4-ab13-7d3fe8c00845.jpg',
      nickname: 'جواد',
      messages: [
        {
          id: 139,
          message: 'سلام خوبی خداروشکر چه خبر',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
        {
          id: 149,
          message: 'چی کار می کنی؟😊',
          createdOn: '2025-03-23T06:52:35.928Z',
          media: [],
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
      ],
    },
  ];
  messagesUpdated$ = new Subject<void>();
  isSelecting = new BehaviorSubject<boolean>(false);
  selectActionStarted = new BehaviorSubject<boolean>(false);
  selectedMessages = new BehaviorSubject<number[]>([]);
  private currentUser = {
    id: 3,
    nickname: 'حسین الهی',
    userId: 'abc',
    img: 'https://localhost:5000/uploads/bannerHome4_ff2a2614-3c5f-42ea-9632-c9da052d1a02.jpg',
  };
  constructor() {}

  addNewMessage(message: Message) {
    if (this._messages[0].userId == this.currentUser.userId)
      this._messages[0].messages.push(message);
    else {
      const currentMessage: UserMessage = {
        id: this.currentUser.id,
        userId: this.currentUser.userId,
        nickname: this.currentUser.nickname,
        img: this.currentUser.img,
        messages: [message],
      };
      this._messages = [currentMessage, ...this._messages];
    }
    this.messagesUpdated$.next();
  }

  getMessages(
    skip: number,
    take: number
  ): Observable<LazyLoadResponse<UserMessage>> {
    return of<LazyLoadResponse<UserMessage>>({
      list: this._messages,
      hasMore: true,
    });
  }
}
