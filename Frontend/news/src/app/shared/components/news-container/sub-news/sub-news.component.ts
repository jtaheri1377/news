import { Component, Input } from '@angular/core'; 
import { Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NewsCategories, NewsCategoryKey } from '../../../../core/constants/news-categories';
import { MeetingService } from '../../../../modules/meeting/services/meeting.service';

@Component({
  selector: 'app-sub-news',
  standalone: false,

  templateUrl: './sub-news.component.html',
  styleUrl: './sub-news.component.scss',
})
export class SubNewsComponent {
  newsCategories: (typeof NewsCategories)[NewsCategoryKey] | null = null;
  
}
