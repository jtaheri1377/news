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
      title: 'جلسات مجمع عمومی',
      icon: 'fa-bullhorn',
    },
    {
      name: 'board',
      title: 'جلسات هیئت رئیسه',
      icon: 'fa-hot-tub-person',
    },
    {
      name: 'provincial',
      title: 'جلسات مجمع استانی',
      icon: 'fa-city',
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
