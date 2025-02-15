import { Component } from '@angular/core';
import { StoryService } from '../services/story.service';

@Component({
  selector: 'app-story',
  standalone: false,

  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent {
  constructor(private story: StoryService) {}
  stories = [
    {
      name: '',
      title: ' دیدار هیئت رئیسه امروز با مدیر حوزه های علمیه حضرت آیت الله',
      img: './test/story1.jpg',
    },
    {
      name: '',
      title: 'سفر رئیس مجمع نمایندگان به تهران',
      img: './test/story2.jpg',
    },
    {
      name: '',
      title: 'بازدید هیئت رئیسه از نمایشگاه کتاب حوزه',
      img: './test/story3.jpg',
    },
    {
      name: '',
      title: 'دیدار با رئیس جمهور محترم',
      img: './test/story7.jpg',
    },
    {
      name: '',
      title: 'جلسه نمایندگان طلاب قم',
      img: './test/story4.jpg',
    },

    {
      name: '',
      title: 'رونمایی از تألیفات جدید نمایندگان طلاب',
      img: './test/story5.jpg',
    },
    {
      name: '',
      title: 'رونمایی از تألیفات جدید نمایندگان طلاب',
      img: './test/story6.jpg',
    },
   
  ];

  showStory() {
    this.story.showStory.next(true);
  }
}
