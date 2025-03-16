import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-sub-headers',
  standalone: false,

  templateUrl: './nav-sub-headers.component.html',
  styleUrl: './nav-sub-headers.component.scss',
})
export class NavSubHeadersComponent {
  selectedItem: string = 'home';

  @ViewChild('public') MyProp!: ElementRef;

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  navigateTo(sectionName: string) {
    this.MyProp.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
