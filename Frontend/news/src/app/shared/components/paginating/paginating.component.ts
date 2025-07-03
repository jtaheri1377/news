import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paginating',
  standalone: false,

  templateUrl: './paginating.component.html',
  styleUrl: './paginating.component.scss'
})
export class PaginatingComponent {
  @Input() length: number = 0;
  @Input() pageSize: number = 0;

  goToPage(e: any) {
    console.log(e);
  }
}
