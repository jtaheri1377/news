import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-link-line',
  standalone: false,

  templateUrl: './link-line.component.html',
  styleUrl: './link-line.component.scss',
})
export class LinkLineComponent {
  links = [
    {
      name: '',
      title: 'خانه',
      icon: 'fa-home',
    },
    {
      name: 'provinces',
      title: 'اخبار استان ها ',
      icon: 'fa-map',
    },
  ];


   selectedItem: string = 'home';
  
    @ViewChild('public') MyProp!: ElementRef;
  
    scrollTo(id: string) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    navigateTo(sectionName: string) {
      this.MyProp.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block:'start' ,
      });
    }
}
