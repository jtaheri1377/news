import { Component } from '@angular/core';

@Component({
  selector: 'app-meeting',
  standalone: false,
  
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.scss'
})
export class MeetingComponent {
  bannerItems = [
    {
      id: 0,
      img: './test/namayande2.jpg',
      title: 'دیدار نماینده مجلس خبرگان با رئیس مجمع نمایندگان طلاب شیراز',
      studyTime: '4',
      date: 'دو روز پیش',
    },
    {
      id: 1,
      img: './test/namayande5.jpg',
      title: 'همایش جهاد تبیین و انتخابات کرمان',
      studyTime: '5',
      date: 'در این هفته',
    },
    {
      id: 2,
      img: './test/namayande3.jpg',
      title: 'مراسم تجلیل از بزرگان علمی شیراز',
      studyTime: '7',
      date: 'در این هفته',
    },
    {
      id: 3,
      img: './test/namayande4.jpg',
      title: 'مراسم عمامه گذاری نیمه شعبان طلاب اصفهان',
      studyTime: '3',
      date: 'دیروز',
    },
  ];
}
