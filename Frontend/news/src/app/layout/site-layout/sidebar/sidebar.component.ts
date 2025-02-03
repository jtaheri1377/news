import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  activeIndex = 1;

  getTop() {
    return (
      (
        this.activeIndex * 62.5 +
        ((this.activeIndex - 1) * 4) -
        31.25 -
        12
      ).toString() + 'px '
    );
  }
}
