import { Component } from '@angular/core';

@Component({
  selector: 'app-provinces',
  standalone: false,

  templateUrl: './provinces.component.html',
  styleUrl: './provinces.component.scss',
})
export class ProvincesComponent {
  province: string | null = null;
  options = [
    { label: 'همه استان ها', value: null },
    { label: 'تهران', value: 1 },
    { label: 'اصفان', value: 2 },
    { label: 'مشهد', value: 3 },
    { label: 'قم', value: 4 },
  ];

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
