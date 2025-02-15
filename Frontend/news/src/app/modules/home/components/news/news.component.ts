import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  standalone: false,
  
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  bannerItems = [
    {
      id: 0,
      img: './test/bannerHome1.jpg',
      title: 'دیدار نماینده مجلس خبرگان با رئیس مجمع نمایندگان طلاب شیراز',
      studyTime: '4',
      date: 'دو روز پیش',
    },
    {
      id: 1,
      img: './test/bannerHome2.jpg',
      title:
        'از قول مساعد برای اجرای طرح های عملیاتی مجمع نمایندگان تا تلاش برای برپایی میز خدمت در مدارس علمی',
      studyTime: '5',
      date: 'در این هفته',
    },
    {
      id: 2,
      img: './test/bannerHome3.jpg',
      title: 'مجمع نمایندگان طلاب باید در تراز حوزه انقلابی باشد',
      studyTime: '7',
      date: 'در این هفته',
    },
    {
      id: 3,
      img: './test/bannerHome4.jpg',
      title: 'مجمع نمایندگان طلاب و فضلای حوزه علمیه قم',
      studyTime: '3',
      date: 'دیروز',
    },
  ];
}
