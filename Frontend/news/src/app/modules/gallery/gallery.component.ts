import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { GalleryService } from './services/gallery.service';
import { LazyLoadResponse } from '../../core/models/lazyLoadResponse/LazyLoadResponse.model';
import { Gallery } from '../../core/models/gallery/gallery.model';
import { MediaViewerComponent } from './components/media-viewer/media-viewer.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Media } from '../../core/models/media/media.model';
@Component({
  selector: 'app-gallery',
  standalone: false,

  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit, OnDestroy {
  // @Input() newsCategory: (typeof NewsCategories)[NewsCategoryKey] | null = null;

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

  subs: Subscription[] = [];
  horizontal_Result: boolean = false;
  hasMore: boolean = false;
  isLoading: boolean = false;
  switcher: boolean = false;
  newsCount: number = 0;
  items: Gallery[] = [];
  // @Input('isSubnewsPage') isSubnewsPage: boolean = false;

  constructor(
    private service: GalleryService // private router: Router, // private route: ActivatedRoute
  ) {}

  readonly dialog = inject(MatDialog);
  screenWidth = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
  }

  openDialog(galleryItem: Gallery): void {
    const dialogRef = this.dialog.open(MediaViewerComponent, {
      data: galleryItem,
      width: '99vw',
      height: '95vh',
      // {name: this.name(), animal: this.animal()},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   if (result !== undefined) {
    //     this.animal.set(result);
    //   }
    // });
  }

  ngOnInit(): void {
    // if (this.newsCategory == null) {
    //   this.route.params
    //     .pipe(
    //       map((route: Params) => {
    //         var category = Object.values(NewsCategories).find(
    //           (x) => x.slug == route['slug']

    //         );
    //         this.newsCategory =
    //           category as (typeof NewsCategories)[NewsCategoryKey];
    //         this.fetchNews();
    //       })
    //     )
    //     .subscribe(() => {});
    // } else
    this.fetchNews();
  }

  isBigItem(itemIndex: number): boolean {
    if (itemIndex == 0) {
      console.log('big:', itemIndex);
      return true;
    }
    // mobile
    //

  if (this.screenWidth > 0 && this.screenWidth < 640) {

      let n = 1;
      let addSixteen = true;
      while (n < itemIndex+1) {
        n += addSixteen ? 7 : 5;
        addSixteen = !addSixteen;}
        if (n === itemIndex+1) return true;
        else return false;
    } else if (this.screenWidth >= 640 && this.screenWidth < 768) {
      let n = 1;
      let addSixteen = true;
      while (n < itemIndex+1) {
        n += addSixteen ? 11 : 7;
        addSixteen = !addSixteen;
      }
      if (n === itemIndex+1) return true;
      else return false;
    } else if (this.screenWidth >= 768 && this.screenWidth < 1024) {
      let n = 1;
      let addSixteen = true;
      while (n < itemIndex+1) {
        n += addSixteen ? 10 : 4;
        addSixteen = !addSixteen;
      }
      if (n === itemIndex+1) return true;
      else return false;
    }
    else if (this.screenWidth >= 1024 && this.screenWidth < 1280) {
      let n = 1;
      let addSixteen = true;
      while (n < itemIndex+1) {
        n += addSixteen ? 13 : 5;
        addSixteen = !addSixteen;
      }
      if (n === itemIndex+1) return true;
      else return false;
    }
    else if (this.screenWidth >= 1280 ) {
      let n = 1;
      let addSixteen = true;
      while (n < itemIndex+1) {
        n += addSixteen ? 16 : 6;
        addSixteen = !addSixteen;
      }
      if (n === itemIndex+1) return true;
      else return false;
    }
    console.log('small:', itemIndex);

    return false;
  }

  getRandomBackground():string{
    var random= (Math.random()*1000)/10;

    // switch (true) {
      // case random==0:
      //   return 'to-gray-200'
        // case random>0&&random<10:
        //   return 'to-green-300'
        // case random>10&& random<20:
        //   return 'to-indigo-300'
        // case random>20&& random<30:
        //   return 'to-green-400'
        // case random>30&& random<40:
        //   return 'to-red-400'
        // case random>40&& random<50:
        //   return 'to-lime-400'
        // case random>50&& random<60:
        //   return 'to-blue-300'
        // case random>60&& random<70:
        //   return 'to-amber-400'
        // case random>70&& random<80:
        //   return 'to-sky-400'
        // case random>80&& random<90:
        //   return 'to-pink-400'
        // case random>90&& random<100:
        //   return 'to-yellow-400'
      // default:
       return 'to-gray-400'
    // }
  }

  isBigItemLeft(itemIndex: number): boolean {
    // پیدا کردن چندمین آیتم بزرگ هستیم
    let bigItemOrder = 0;
    for (let i = 0; i <= itemIndex; i++) {
      if (this.isBigItem(i)) {
        bigItemOrder++;
      }
    }
    // اگه ترتیبش فرد باشه بزار سمت راست، اگه زوج باشه بزار سمت چپ
    return bigItemOrder % 2 === 0;
  }

  fetchNews() {
    //
    this.isLoading = true;
    var sub = this.service

      .getGallery(this.newsCount, 10)
      .pipe(debounceTime(500))
      .subscribe((result: LazyLoadResponse<Gallery>) => {
        //
        // this.items.push(...result.news);
        this.items = [...this.items, ...result.list];
        this.hasMore = result.hasMore;
        this.newsCount += result.list.length;
        this.isLoading = false;
      });
    this.subs.push(sub);
  }

  checkMedias(medias: Media[]): string {
    let hasVideo: Boolean = false;
    let hasImage: Boolean = false;

    for (let i = 0; i < medias.length; i++) {
      if (medias[i].fileType == 'Video') {
        hasVideo = true;
      } else if (medias[i].fileType == 'Image') {
        hasImage = true;
      }
    }

    if (medias.length > 1) {
      if (hasImage && !hasVideo) return 'fa-images';
      else return 'fa-photo-film';
    } else if (medias.length == 1) {
      if (hasVideo) return 'fa-play';
      else return '';
    } else return '';
  }

  getFirstImage(medias: Media[]): string {
    for (let i = 0; i < medias.length; i++) {
      if (medias[i].fileType == 'Image') return medias[i].fileUrl;
      else return '';
    }
    return '';
  }

  getFirstVideo(medias: Media[]): string {
    for (let i = 0; i < medias.length; i++) {
      if (medias[i].fileType == 'Video') return medias[i].fileUrl;
      else return '';
    }
    return '';
  }

  // goToSubnewsPage() {
  //   if (!this.isSubnewsPage) {
  //     var routeSlug = this.newsCategory!.slug;
  //     this.router.navigate([routeSlug], { relativeTo: this.route });
  //   }
  // }

  // getMore() {
  //   this.isLoading = true;
  //   var sub = this.service
  //     .getNews(this.heading.ctgId, this.newsCount, 1)
  //     .subscribe((result: NewsResponse) => {
  //       this.isLoading = false;
  //       this.items.push(...result.news);
  //       this.hasMore = result.hasMore;
  //       this.newsCount += 1;
  //     });
  //   this.subs.push(sub);
  // }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
