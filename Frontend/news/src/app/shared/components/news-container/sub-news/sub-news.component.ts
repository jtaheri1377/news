import { Component, Input, OnInit } from '@angular/core'; 
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {  NewsCategory } from '../../../../core/constants/news-categories';
import { MeetingService } from '../../../../modules/meeting/services/meeting.service';
import { NewsCategoryService } from '../../../../core/constants/services/news-category.service';

@Component({
  selector: 'app-sub-news',
  standalone: false,

  templateUrl: './sub-news.component.html',
  styleUrl: './sub-news.component.scss',
})
export class SubNewsComponent implements OnInit {
  newsCategory: NewsCategory | null = null; 

  constructor(private route:ActivatedRoute,private newsCategoryService:NewsCategoryService) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(route=>{
      
      const routeSlug=route['slug']
      this.newsCategory= this.newsCategoryService.findCategoryByValue(routeSlug)
    })
  }
  
}
