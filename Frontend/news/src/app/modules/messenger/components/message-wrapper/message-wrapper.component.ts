import { AfterViewChecked, AfterViewInit, Component, ElementRef, model, OnInit, signal, ViewChild } from '@angular/core';
import { UserMessage } from '../../models/userMassage/userMessage.model';

@Component({
  selector: 'app-message-wrapper',
  standalone: false,

  templateUrl: './message-wrapper.component.html',
  styleUrl: './message-wrapper.component.scss',
})
export class MessageWrapperComponent implements AfterViewInit {
  @ViewChild('bottom') bottom!: ElementRef;
  readonly currentUserId = model('abc');
  readonly messages = signal<UserMessage[]>([
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
          id: 39,
          message: 'سلام خوبی خداروشکر چه خبر',
          createdOn: '2025-03-23T06:52:35.928Z',
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
        {
          id: 39,
          message: 'چی کار می کنی؟😊',
          createdOn: '2025-03-23T06:52:35.928Z',
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
          id: 39,
          message: 'حسین جون سلام',
          createdOn: '2025-03-23T06:52:35.928Z',
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
          id: 39,
          message: 'سلام خوبی خداروشکر چه خبر',
          createdOn: '2025-03-23T06:52:35.928Z',
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
        {
          id: 39,
          message: 'چی کار می کنی؟😊',
          createdOn: '2025-03-23T06:52:35.928Z',
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
          id: 39,
          message: 'حسین جون سلام',
          createdOn: '2025-03-23T06:52:35.928Z',
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
          id: 39,
          message: 'سلام خوبی خداروشکر چه خبر',
          createdOn: '2025-03-23T06:52:35.928Z',
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
        {
          id: 39,
          message: 'چی کار می کنی؟😊',
          createdOn: '2025-03-23T06:52:35.928Z',
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
          id: 39,
          message: 'حسین جون سلام',
          createdOn: '2025-03-23T06:52:35.928Z',
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
          id: 39,
          message: 'سلام خوبی خداروشکر چه خبر',
          createdOn: '2025-03-23T06:52:35.928Z',
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
        {
          id: 39,
          message: 'چی کار می کنی؟😊',
          createdOn: '2025-03-23T06:52:35.928Z',
          editedOn: '2025-03-23T06:52:35.928Z',
          isSeen: false,
        },
      ],
    },
   
  ]);

   
  ngAfterViewInit(): void {
    this.scrollTo(this.bottom.nativeElement);
      
  }

  scrollTo(element: any) {
    // element.scrollIntoView({ behavior:'smooth'});
    element.scrollIntoView();
  }

  
}
