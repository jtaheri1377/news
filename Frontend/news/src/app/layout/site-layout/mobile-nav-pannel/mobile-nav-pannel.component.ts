import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-nav-pannel',
  standalone: false,

  templateUrl: './mobile-nav-pannel.component.html',
  styleUrl: './mobile-nav-pannel.component.scss',
})
export class MobileNavPannelComponent {
  selectedItem: string = 'home';
}
