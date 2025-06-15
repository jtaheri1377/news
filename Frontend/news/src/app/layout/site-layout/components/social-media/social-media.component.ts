import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, merge, Subscription, tap } from 'rxjs';
import { SiteFile } from '../../../../modules/admin/site-file/models/siteFile.model';
import { HomeService } from '../../../../modules/home/services/home.service';
import { SiteFileType } from '../../../../core/Enums/site-file-type';

@Component({
  selector: 'app-social-media',
  standalone: false,

  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.scss',
})
export class SocialMediaComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  links: SiteFile[] = [];
  showLinks: boolean = false;
  constructor(private service: HomeService) {}
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const requests = [
      this.service
        .getImage(SiteFileType.FirstSocialLinkImage)
        .pipe(tap((image) => this.links.push(image))),
      this.service
        .getImage(SiteFileType.SecondSocialLinkImage)
        .pipe(tap((image) => this.links.push(image))),
      this.service
        .getImage(SiteFileType.ThirdSocialLinkImage)
        .pipe(tap((image) => this.links.push(image))),
      this.service
        .getImage(SiteFileType.ForthSocialLinkImage)
        .pipe(tap((image) => this.links.push(image))),
    ];
    //
    var sub = merge(...requests).subscribe({
      //

      // f:()=>{},
      complete: () => {},
      error: (err) => {
        // console.error('An unhandled error occurred in the merge stream:', err);
      },
    });

    // this.service
    //   .getImage(SiteFileType.FirstSocialLinkImage)
    //   .subscribe((image) => {
    //     this.links.push(image);
    //   });
    // this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
