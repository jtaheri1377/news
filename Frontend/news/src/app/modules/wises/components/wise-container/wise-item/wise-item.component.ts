import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Wise } from '../../../../../core/models/wise/wise.model';

@Component({
  selector: 'app-wise-item',
  standalone: false,

  templateUrl: './wise-item.component.html',
  styleUrl: './wise-item.component.scss',
})
export class WiseItemComponent {
  selectedItem: string = '';
  @Input() item:Wise|null=null;

  books = [
    {
      id: 0,
      img: './test/thumbnail1.jpg',
      title: 'دیدار نماینده مجلس خبرگان با رئیس مجمع نمایندگان طلاب شیراز',
      studyTime: '4',
      date: 'دو روز پیش',
    },
    {
      id: 1,
      img: './test/thumbnail2.jpg',
      title:
        'از قول مساعد برای اجرای طرح های عملیاتی مجمع نمایندگان تا تلاش برای برپایی میز خدمت در مدارس علمی',
      studyTime: '5',
      date: 'در این هفته',
    },
    {
      id: 2,
      img: './test/thumbnail3.jpg',
      title: 'مجمع نمایندگان طلاب باید در تراز حوزه انقلابی باشد',
      studyTime: '7',
      date: 'در این هفته',
    },
    {
      id: 3,
      img: './test/thumbnail4.jpg',
      title: 'مجمع نمایندگان طلاب و فضلای حوزه علمیه قم',
      studyTime: '3',
      date: 'دیروز',
    },
    {
      id: 3,
      img: './test/thumbnail5.jpg',
      title: 'مجمع نمایندگان طلاب و فضلای حوزه علمیه قم',
      studyTime: '3',
      date: 'دیروز',
    },
    {
      id: 3,
      img: './test/thumbnail6.jpg',
      title: 'مجمع نمایندگان طلاب و فضلای حوزه علمیه قم',
      studyTime: '3',
      date: 'دیروز',
    },
  ];

  @ViewChild('public') MyProp!: ElementRef;

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
