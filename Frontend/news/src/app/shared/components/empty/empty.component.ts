import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty',
  standalone: false,

  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss'
})
export class EmptyComponent {
@Input() message: string= "موردی یافت نشد!";
}
