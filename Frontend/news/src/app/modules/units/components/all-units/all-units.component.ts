import { Component } from '@angular/core';
import { NewsCategories, NewsCategory } from '../../../../core/constants/news-categories';

@Component({
  selector: 'app-all-units',
  standalone: false,

  templateUrl: './all-units.component.html',
  styleUrl: './all-units.component.scss',
})
export class AllUnitsComponent {
  newsCategories= NewsCategories 
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
