import { Component } from '@angular/core';

@Component({
  selector: 'app-news-container',
  standalone: false,

  templateUrl: './news-container.component.html',
  styleUrl: './news-container.component.scss',
})
export class NewsContainerComponent {
  horizontal_Result: boolean = false;
}
