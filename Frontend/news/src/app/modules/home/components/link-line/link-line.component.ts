import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SiteFile } from '../../../admin/site-file/models/siteFile.model';
import { combineLatest, forkJoin, Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { SiteFileType } from '../../../../core/Enums/site-file-type';

@Component({
  selector: 'app-link-line',
  standalone: false,

  templateUrl: './link-line.component.html',
  styleUrl: './link-line.component.scss',
})
export class LinkLineComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  links: SiteFile[] = [];

  constructor(private service: HomeService) {}
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    var sub = forkJoin([
      this.service.getImage(SiteFileType.FirstLinkImage),
      this.service.getImage(SiteFileType.SecondLinkImage),
      this.service.getImage(SiteFileType.ThirdLinkImage),
      this.service.getImage(SiteFileType.ForthLinkImage),
    ]).subscribe(([first, second, third, forth]) => {
      // (first) => {
      // this.showStory = first;
      // this.homeTopImage = second;
      // this.homeTopImageMobile = third;
      // this.firstAd = forth;
      this.links.push(first, second, third, forth);
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
  // scrollTo(id: string) {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }
  // navigateTo(sectionName: string) {
  //   this.MyProp.nativeElement.scrollIntoView({
  //     behavior: 'smooth',
  //     block:'start' ,
  //   });
  // }
}
