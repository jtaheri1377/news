import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[LessTabHeader]',
  standalone: false,
})
export class LessTabHeaderDirective {
  constructor(private eleRef: ElementRef) {}

  ngOnInit(): void {
    this.eleRef.nativeElement.children[0].style.display = 'none';
  }
}
