import { Component, Input, OnInit } from '@angular/core';
import { NewsItem } from '../../../../core/models/News/newsItem.model';
import { NewsCategory } from '../../../../core/constants/news-categories';

@Component({
  selector: 'app-links',
  standalone: false,

  templateUrl: './links.component.html',
  styleUrl: './links.component.scss',
})
export class LinksComponent {
  [x: string]: any;
  @Input() items: NewsItem[] = [];
  @Input() noHeading: boolean=false;
  @Input() newsCategory: NewsCategory | null = null;
}
