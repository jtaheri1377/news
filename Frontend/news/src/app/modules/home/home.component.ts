import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { StoryService } from './components/stories/services/story.service';
import { NewsCategories } from '../../core/constants/news-categories';
import { Media } from '../../core/models/media/media.model';
import { Story } from '../../core/models/story/story.model';
import { combineLatest, Subscription } from 'rxjs';
import { HomeService } from './services/home.service';
import { SiteFileType } from '../../core/Enums/site-file-type';
import { SiteFile } from '../admin/site-file/models/siteFile.model';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  showStory: Story | null = null;
  subs: Subscription[] = [];
  newsCategories = NewsCategories;
  isLoading: Boolean = false;
  homeTopImage: SiteFile | null = null;
  homeTopImageMobile: SiteFile | null = null;
  firstAd: SiteFile | null = null;
  secondAd: SiteFile | null = null;
  constructor(private story: StoryService, private service: HomeService) {}

  bannerItems = [
    {
      id: 0,
      img: './test/bannerHome1.jpg',
      title: 'دیدار نماینده مجلس خبرگان با رئیس مجمع نمایندگان طلاب شیراز',
      studyTime: '4',
      date: 'دو روز پیش',
    },
    {
      id: 1,
      img: './test/bannerHome2.jpg',
      title:
        'از قول مساعد برای اجرای طرح های عملیاتی مجمع نمایندگان تا تلاش برای برپایی میز خدمت در مدارس علمی',
      studyTime: '5',
      date: 'در این هفته',
    },
    {
      id: 2,
      img: './test/bannerHome3.jpg',
      title: 'مجمع نمایندگان طلاب باید در تراز حوزه انقلابی باشد',
      studyTime: '7',
      date: 'در این هفته',
    },
    {
      id: 3,
      img: './test/bannerHome4.jpg',
      title: 'مجمع نمایندگان طلاب و فضلای حوزه علمیه قم',
      studyTime: '3',
      date: 'دیروز',
    },
  ];
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    var sub = combineLatest([
      this.story.showStory,
      this.service.getImage(SiteFileType.HomeTopImage),
      this.service.getImage(SiteFileType.HomeTopImageMobile),
      // this.service.getImage(SiteFileType.FirstAdImage),
      // this.service.getImage(SiteFileType.SecondAdImage),
    ]).subscribe(
      ([
        showStory,
        homeTopImage,
        homeTopImageMobile,
        // FirstAd, SecondAd
      ]) => {
        this.isLoading = false;

        this.showStory = showStory;
        this.homeTopImage = homeTopImage;
        this.homeTopImageMobile = homeTopImageMobile;
        // this.firstAd = FirstAd;
        // this.secondAd = SecondAd;
      }
    );
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
