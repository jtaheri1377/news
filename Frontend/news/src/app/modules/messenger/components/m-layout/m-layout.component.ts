import { Component } from '@angular/core';

@Component({
  selector: 'app-m-layout',
  standalone: false,

  templateUrl: './m-layout.component.html',
  styleUrl: './m-layout.component.scss',
})
export class MLayoutComponent {
  showMessageWrapper: boolean = false;

  toggleMessageWrapper() {
    this.showMessageWrapper = !this.showMessageWrapper;
  }

  ShowMessageWrapperClass(){
    
  }
}
