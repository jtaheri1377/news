import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-headers',
  standalone: false,

  templateUrl: './nav-headers.component.html',
  styleUrl: './nav-headers.component.scss',
})
export class NavHeadersComponent {

  constructor(private router:Router){}
  selectedItem: string = 'home';

  navigateTo(url:string[]){
  this.router.navigate(url)
  }
}
