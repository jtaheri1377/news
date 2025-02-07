import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-meeting-navs',
  standalone: false,

  templateUrl: './meeting-navs.component.html',
  styleUrl: './meeting-navs.component.scss',
})
export class MeetingNavsComponent {
  selectedItem: string = '';

  navs = [
    {
      name: 'public',
      title: 'جلسات عمومی',
      icon: 'fa-bullhorn',
    },
    {
      name: 'directors-board',
      title: 'جلسات هیئت رئیسه',
      icon: 'fa-hot-tub-person',
    },
    {
      name: 'special',
      title: 'جلسات ویژه',
      icon: 'fa-person-dots-from-line',
    },
    {
      name: 'political',
      title: 'جلسات کمیسیون سیاسی',
      icon: 'fa-city',
    },
    {
      name: 'provincial',
      title: 'جلسات استانی',
      icon: 'fa-person-arrow-down-to-line',
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
