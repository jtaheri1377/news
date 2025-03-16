import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-unit-navs',
  standalone: false,

  templateUrl: './unit-navs.component.html',
  styleUrl: './unit-navs.component.scss',
})
export class UnitNavsComponent {
  selectedItem: string = '';

  navs = [
    {
      name: 'commission-seeyasi',
      title: 'کمیسیون سیاسی',
      icon: 'fa-hot-tub-person',
    },
    {
      name: 'commission-faramin-emam-rahbari',
      title: 'کمیسیون پیگیری فرامین امام و رهبری',
      icon: 'fa-people-group',
    },
    {
      title: 'کمیسیون حوزه و دانشگاه',
      name: 'commission-hoze-daneshgah',

      icon: 'fa-hot-tub-person',
    },
    {
      title: 'کمیسیون طرح و برنامه',
      name: 'commission-tarh-barname',
      icon: 'fa-people-group',
    },
    {
      title: 'کمیسیون تحقیقات علمی',
      name: 'commission-Tahqiqat-elmi',
      icon: 'fa-hot-tub-person',
    },
    {
      title: 'کمیسیون تشکیلات علمی',
      name: 'commission-Tashkilat-elmi',
      icon: 'fa-people-group',
    },
    {
      title: 'کمیسیون تحقیق و بررسی',
      name: 'commission-tahqiq-barresi',
      icon: 'fa-hot-tub-person',
    },
    {
      title: 'کمیسیون جذب و گزینش',
      name: 'commission-jazb-gozinesh',
      icon: 'fa-people-group',
    },
    {
      title: 'کمیسیون مالی و اقتصادی',
      name: 'commission-mali-eqtesadi',
      icon: 'fa-hot-tub-person',
    },
    {
      title: 'کمیسیون تبلیغات',
      name: 'commission-tabliqat',
      icon: 'fa-people-group',
    },
    {
      title: 'کمیسیون بسیج و آمادگی',
      name: 'commission-basij-amadegi',
      icon: 'fa-hot-tub-person',
    },
    {
      title: 'کمیسیون آموزش',
      name: 'commission-amoozesh',
      icon: 'fa-people-group',
    },
    {
      title: 'کمیسیون اخلاق',
      name: 'commission-akhlaq',
      icon: 'fa-hot-tub-person',
    },
    {
      title: 'کمیسیون فضای مجازی',
      name: 'commission-faza-majazi',
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
