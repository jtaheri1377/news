import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-item',
  standalone: false,

  templateUrl: './image-item.component.html',
  styleUrl: './image-item.component.scss',
})
export class ImageItemComponent {
  @Input('items') items: any[] = [];
}
