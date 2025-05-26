import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminNewsService } from '../../../modules/admin/news/services/admin-news.service';
import { NewsService } from '../../services/news.service';
import { Subscription, switchMap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsCategories } from '../../../core/constants/news-categories';

@Component({
  selector: 'app-news-veiwer',
  standalone: false,

  templateUrl: './news-veiwer.component.html',
  styleUrl: './news-veiwer.component.scss',
})
export class NewsVeiwerComponent implements OnInit, AfterViewInit {
  subs: Subscription[] = [];
  item: any;
  newsCategories: any = NewsCategories;
  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private service: NewsService
  ) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToTop();
    }, 100);
  }

  @ViewChild('top') top!: ElementRef;

  ngOnInit(): void {
    const sub = this.route.params
      .pipe(
        switchMap((route: any) => {
          const id = route['id'];
          return this.service.get(id);
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.item = response;

        this.scrollToTop();
      });

    this.subs.push(sub);
  }

  scrollToTop() {
    this.top.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  get sanitizedContent() {
    return this.sanitizer.bypassSecurityTrustHtml(this.item.content);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
