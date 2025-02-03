import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-headers',
  standalone: false,
  
  templateUrl: './nav-headers.component.html',
  styleUrl: './nav-headers.component.scss'
})
export class NavHeadersComponent {
  selectedItem:string="home";
}
