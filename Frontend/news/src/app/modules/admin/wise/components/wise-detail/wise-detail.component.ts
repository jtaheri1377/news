import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { WiseService } from '../../../../wises/services/wise.service';
import { Wise } from '../../../../../core/models/wise/wise.model';

@Component({
  selector: 'app-wise-detail',
  standalone: false,

  templateUrl: './wise-detail.component.html',
  styleUrl: './wise-detail.component.scss'
})
export class WiseDetailComponent implements OnInit, AfterViewInit {
  subs: Subscription[] = [];
  item: Wise|null=null;

  constructor(
    private route: ActivatedRoute,
    private service: WiseService
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


  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
}
