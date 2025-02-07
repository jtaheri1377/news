import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-interviews-navs',
  standalone: false,
  
  templateUrl: './interviews-navs.component.html',
  styleUrl: './interviews-navs.component.scss'
})
export class InterviewsNavsComponent {

   selectedItem: string = '';
  
    navs = [
      
      {
        name: 'directors-board',
        title: 'مصاحبه هیئت رئیسه',
        icon: 'fa-hot-tub-person',
      },
      {
        name: 'special',
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
