import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-provinces-slider',
  standalone: false,
  
  templateUrl: './provinces-slider.component.html',
  styleUrl: './provinces-slider.component.scss'
})
export class ProvincesSliderComponent {

   selectedItem: string = '';
    
      navs = [
        {
          name: 'directors-board',
          title: 'همه استان ها',
          icon: 'fa-hot-tub-person',
        },
        {
          name: 'special',
          title: 'تهران',
          icon: 'fa-people-group',
        },
        {
          name: 'directors-board',
          title: 'مشهد',
          icon: 'fa-hot-tub-person',
        },
        {
          name: 'special',
          title: 'اصفهان',
          icon: 'fa-people-group',
        },
        {
          name: 'directors-board',
          title: 'شیراز',
          icon: 'fa-hot-tub-person',
        },
        {
          name: 'special',
          title: 'قم',
          icon: 'fa-people-group',
        },
        {
          name: 'directors-board',
          title: 'بوشهر',
          icon: 'fa-hot-tub-person',
        },
        {
          name: 'special',
          title: 'کرمانشاه',
          icon: 'fa-people-group',
        },
        {
          name: 'directors-board',
          title: 'ایلام',
          icon: 'fa-hot-tub-person',
        },
        {
          name: 'special',
          title: 'گیلان',
          icon: 'fa-people-group',
        },
        {
          name: 'directors-board',
          title: 'مازندران',
          icon: 'fa-hot-tub-person',
        },
        {
          name: 'special',
          title: 'اهواز',
          icon: 'fa-people-group',
        },
        {
          name: 'directors-board',
          title: 'سمنان',
          icon: 'fa-hot-tub-person',
        },
        {
          name: 'special',
          title: 'کرمان',
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
