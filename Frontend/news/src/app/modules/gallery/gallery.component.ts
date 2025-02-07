import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: false,

  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  images = [
    {
      packId: 0,
      items: [
        {
          id: 1,
          src: './img/test2.jpg',
        },
        {
          id: 2,
          src: './img/test.jpg',
        },
        {
          id: 3,
          src: './img/rahbar2.jpg',
        },
        {
          id: 4,
          src: './img/rahbar3.jpg',
        },
        {
          id: 5,
          src: './img/rahbar4.jpg',
        },
        {
          id: 6,
          src: './img/rahbar5.jpg',
        },
        {
          id: 7,
          src: './img/story1.jpg',
        },
        {
          id: 8,
          src: './img/story2.jpg',
        },
        {
          id: 9,
          src: './img/story3.jpg',
        },
        {
          id: 10,
          src: './img/test2.jpg',
        },
        {
          id: 11,
          src: './img/test3.jpg',
        },
      ],
    },
    {
      packId: 0,
      items: [
        {
          id: 1,
          src: './img/test2.jpg',
        },
        {
          id: 2,
          src: './img/rahbar.jpg',
        },
        {
          id: 3,
          src: './img/rahbar2.jpg',
        },
        {
          id: 4,
          src: './img/rahbar3.jpg',
        },
        {
          id: 5,
          src: './img/rahbar4.jpg',
        },
        {
          id: 6,
          src: './img/rahbar5.jpg',
        },
        {
          id: 7,
          src: './img/story1.jpg',
        },
        {
          id: 8,
          src: './img/story2.jpg',
        },
        {
          id: 9,
          src: './img/story3.jpg',
        },
        {
          id: 10,
          src: './img/test2.jpg',
        },
        {
          id: 11,
          src: './img/test3.jpg',
        },
      ],
    },
  ];
}
