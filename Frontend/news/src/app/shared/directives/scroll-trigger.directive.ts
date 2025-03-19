 
import { Directive, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appScrollTrigger]',
  standalone: false

})
export class ScrollTriggerDirective implements AfterViewInit {
  @Output() visible = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.visible.emit(); // وقتی عنصر دیده شد، رویداد اجرا شود
      }
    }, { threshold: 1.0 });

    observer.observe(this.el.nativeElement);
  }
}
