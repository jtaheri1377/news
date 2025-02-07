import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-unit-navs',
  standalone: false,
  
  templateUrl: './unit-navs.component.html',
  styleUrl: './unit-navs.component.scss'
})
export class UnitNavsComponent {
  selectedItem: string = '';
  
    navs = [
      {
        name: 'directors-board',
        title: 'فضای مجازی',
        icon: 'fa-hot-tub-person',
      },
      {
        name: 'special',
        title: 'اخلاق',
        icon: 'fa-people-group',
      },
      {
        name: 'directors-board',
        title: 'آموزش',
        icon: 'fa-hot-tub-person',
      },
      {
        name: 'special',
        title: 'بسیج و آمادگی',
        icon: 'fa-people-group',
      },
      {
        name: 'directors-board',
        title: 'پیگیری فرامین امام و رهبری',
        icon: 'fa-hot-tub-person',
      },
      {
        name: 'special',
        title: 'تبلیغات',
        icon: 'fa-people-group',
      },
      {
        name: 'directors-board',
        title: 'تحقیق و بررسی',
        icon: 'fa-hot-tub-person',
      },
      {
        name: 'special',
        title: 'تحقیقات علمی',
        icon: 'fa-people-group',
      },
      {
        name: 'directors-board',
        title: 'تشکیلات علمی',
        icon: 'fa-hot-tub-person',
      },
      {
        name: 'special',
        title: 'جذب و گزینش',
        icon: 'fa-people-group',
      },
      {
        name: 'directors-board',
        title: 'حوزه و دانشگاه',
        icon: 'fa-hot-tub-person',
      },
      {
        name: 'special',
        title: 'سیاسی',
        icon: 'fa-people-group',
      },
      {
        name: 'directors-board',
        title: 'طرح و برنامه',
        icon: 'fa-hot-tub-person',
      },
      {
        name: 'special',
        title: 'مالی و اقتصادی',
        icon: 'fa-people-group',
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
