import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-interviews-navs',
  standalone: false,

  templateUrl: './interviews-navs.component.html',
  styleUrl: './interviews-navs.component.scss',
})
export class InterviewsNavsComponent {
  selectedItem: string = '';

  navs = [
    {
      name: 'mosahebe-heyat-raeesah',
      title: 'مصاحبه هیئت رئیسه',
      icon: 'fa-hot-tub-person',
    },
    {
      name: 'mosahebe-roasa-majame-ostani',
      title: 'مصاحبه رؤسای مجامع استانی',
      icon: 'fa-people-group',
    },
    {
      name: 'mosahebe-roasa-commission',
      title: 'مصاحبه رؤسای کمیسیون ها',
      icon: 'fa-people-group',
    },
    {
      name: 'mosahebe-namayandegan',
      title: 'مصاحبه نمایندگان شهرها',
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
