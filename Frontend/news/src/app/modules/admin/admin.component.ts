import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,

  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
   animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })), // وقتی عنصر هنوز وجود ندارد یا حذف شده
      transition(':enter', [ // ورود عنصر به DOM
        animate('0.5s ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [ // خروج عنصر از DOM
        animate('0.5s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AdminComponent {
content:boolean=false
}
