import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-container',
  standalone: false,

  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.scss',
})
export class NewsContainerComponent {
  horizontal_Result: boolean = false;
  @Input('items') items = [
    {
      id: 0,
      img: './test/news1.jpg',
      title: 'بررسی مسأله غزه و لبنان در نشست اخیر مجمع نمایندگان طلاب',
      studyTime: '3',
      province: 'قم',
      reviews: '',
      subject: 'سیاسی فرهنگی',
    },
    {
      id: 1,
      img: './test/news2.jpg',
      title: 'دیدار رئیس شهرسازی با مجمع نمایندگان طلاب قم',
      studyTime: '4',
      province: 'قم',
      reviews: '64',
      subject: 'علمی فرهنگی',
    },
    {
      id: 2,
      img: './test/news3.jpg',
      title: 'تبریک میلاد امام زمان عجل الله تعالی فرجه الشریف منجی بشریت و پیروزی انقلاب اسلامی',
      studyTime: '7',
      province: 'مشهد',
      reviews: '33',
      subject: 'فرهنگی',
    },
    {
      id: 3,
      img: './test/news4.jpg',
      title: 'سخنرانی کوبنده علیه رژیم غاصب و امریکا ',
      studyTime: '3',
      province: 'اصفهان',
      reviews: '32',
      subject: 'فرهنگی',
    },
    {
      id: 4,
      img: './test/news5.jpg',
      title: 'جلسه خصوصی با آقای خسرو پناه - برای تعامل باید با همه کشور‌ها ارتباط گرفت',
      studyTime: '1',
      province: 'تهران',
      reviews: '43',
      subject: 'سیاسی فرهنگی',
    },
    {
      id: 5,
      img: './test/news6.jpg',
      title: 'چشم امید طلاب و فضلای حوزه به مجمع نمایندگان طلاب ',
      studyTime: '5',
      province: 'قم',
      reviews: '13',
      subject: 'فرهنگی',
    },
    {
      id: 6,
      img: './test/news7.jpg',
      title: 'مجمع نمایندگان طلاب باید در تراز حوزه علمیه انقلابی قرار بگیرد',
      studyTime: '3',
      province: 'تهران',
      reviews: '34',
      subject: 'علمی فرهنگی',
    },
    {
      id: 7,
      img: './test/news8.jpg',
      title: 'اعضای هیئت رئیسه مجمع نمایندگان طلاب و فضلای حوزه علمیه قم انتخاب شدند',
      studyTime: '2',
      province: 'قم',
      reviews: '63',
      subject: 'سیاسی',
    },
    {
      id: 8,
      img: './test/news9.jpg',
      title: 'دیدار اعضای مجمع نمایندگان طلاب و فضلای حوزه علمیه قم با آیت الله العظمی جوادی آملی',
      studyTime: '5',
      province: 'قم',
      reviews: '63',
      subject: 'سیاسی',
    },
  ];
}
