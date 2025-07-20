import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NewsCategory } from '../../../../core/constants/news-categories';
import { NewsCategories } from '../../../../core/constants/news-categories';

@Component({
  selector: 'app-unit-navs',
  standalone: false,

  templateUrl: './unit-navs.component.html',
  styleUrl: './unit-navs.component.scss',
})
export class UnitNavsComponent {
  selectedItem: string = 'commission-seeyasi';
  newsCategories = NewsCategories;
  @Output() categorySelect = new EventEmitter<NewsCategory | null>();

  navs = [
    {
      name: 'commission-seeyasi',
      title: ' سیاسی',
      icon: 'fa-hot-tub-person',
      category:
        this.newsCategories['commissions'].children!['commissionSeeyasi'],
    },
    {
      name: 'commission-faramin-emam-rahbari',
      title: ' پیگیری فرامین امام و رهبری',
      icon: 'fa-people-group',
      category:
        this.newsCategories['commissions'].children!['commissionFaraminEmam'],
    },
    {
      title: ' حوزه و دانشگاه',
      name: 'commission-hoze-daneshgah',

      icon: 'fa-hot-tub-person',
      category:
        this.newsCategories['commissions'].children!['commissionHozeDaneshgah'],
    },
    {
      title: ' طرح و برنامه',
      name: 'commission-tarh-barname',
      icon: 'fa-people-group',
      category:
        this.newsCategories['commissions'].children!['commissionTarhBarname'],
    },
    {
      title: ' تحقیقات علمی',
      name: 'commission-Tahqiqat-elmi',
      icon: 'fa-hot-tub-person',
      category:
        this.newsCategories['commissions'].children!['commissionTahqiqatElmi'],
    },
    {
      title: ' تشکیلات علمی',
      name: 'commission-Tashkilat-elmi',
      icon: 'fa-people-group',
      category:
        this.newsCategories['commissions'].children!['commissionTashkilatElmi'],
    },
    {
      title: ' تحقیق و بررسی',
      name: 'commission-tahqiq-barresi',
      icon: 'fa-hot-tub-person',
      category:
        this.newsCategories['commissions'].children!['commissionTahqiqBarresi'],
    },
    {
      title: ' جذب و گزینش',
      name: 'commission-jazb-gozinesh',
      icon: 'fa-people-group',
      category:
        this.newsCategories['commissions'].children!['commissionjazbGozinesh'],
    },
    {
      title: ' مالی و اقتصادی',
      name: 'commission-mali-eqtesadi',
      icon: 'fa-hot-tub-person',
      category:
        this.newsCategories['commissions'].children!['commissionMaliEqtesadi'],
    },
    {
      title: ' تبلیغات',
      name: 'commission-tabliqat',
      icon: 'fa-people-group',
      category:
        this.newsCategories['commissions'].children!['commissionTabilqat'],
    },
    {
      title: ' بسیج و آمادگی',
      name: 'commission-basij-amadegi',
      icon: 'fa-hot-tub-person',
      category:
        this.newsCategories['commissions'].children!['commissionBasijAmadegi'],
    },
    {
      title: ' آموزش',
      name: 'commission-amoozesh',
      icon: 'fa-people-group',
      category:
        this.newsCategories['commissions'].children!['commissionAmoozesh'],
    },
    {
      title: ' اخلاق',
      name: 'commission-akhlaq',
      icon: 'fa-hot-tub-person',
      category:
        this.newsCategories['commissions'].children!['commissionAkhlaq'],
    },
    {
      title: ' فضای مجازی',
      name: 'commission-faza-majazi',
      icon: 'fa-people-group',
      category:
        this.newsCategories['commissions'].children!['commissionFazaMajazi'],
    },
  ];

  @ViewChild('public') MyProp!: ElementRef;

  scrollTo(item: any) {
    this.categorySelect.next(item.category)
    const element = document.getElementById(item.name);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
