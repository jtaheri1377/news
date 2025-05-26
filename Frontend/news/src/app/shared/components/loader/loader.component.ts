import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: false,

  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  isLoading: boolean = true;
  @Input() text:string|null=null
}
