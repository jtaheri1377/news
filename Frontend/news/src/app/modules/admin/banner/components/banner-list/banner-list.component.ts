import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminBannerService } from '../../services/admin-banner.service';
import { Banner } from '../../../../../core/models/banner/banner.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-banner-list',
  standalone: false,

  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.scss',
})
export class BannerListComponent implements OnInit, OnChanges {
  isLoading: boolean = false;
  @Input() categoryId: number = 0;
  @Output() listUpdate = new EventEmitter<number>();
  subs: Subscription[] = [];
  items: Banner[] = [];

  constructor(private service: AdminBannerService) {}

  ngOnInit(): void {
    this.service.updatedBanner$.subscribe(() => this.fetchNews());
    this.fetchNews();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId']) {
      this.fetchNews();
    }
  }

  fetchNews() {
    this.isLoading = true;
    if (this.categoryId != 0) {
      var sub = this.service
        .getByCategoryId(this.categoryId)
        .subscribe((result: any) => {
          this.items = result;
          this.isLoading = false;
          this.listUpdate.next(this.items.length)
        });
      this.subs.push(sub);
    }
  }
}
