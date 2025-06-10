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
      name: 'jalasat-majma-omoomi',
      title: 'جلسات مجمع عمومی',
      icon: 'fa-bullhorn',
    },
    {
      name: 'jalasat-heyat-raeesah',
      title: 'جلسات هیئت رئیسه',
      icon: 'fa-hot-tub-person',
    },
    {
      name: 'jalasat-majma-ostani',
      title: 'جلسات مجامع استانی',
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
