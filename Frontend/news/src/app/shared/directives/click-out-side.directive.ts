import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appClickOutSide]',
  standalone: false,
})
export class ClickOutSideDirective {
  // @Output() clickOutside = new EventEmitter<void>();
  // @Input() ignoreClickOutside?: HTMLElement | null;

  private unlisten!: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // اضافه کردن لیسنر کلیک با Renderer2
    // this.unlisten = this.renderer.listen('document', 'click', (event: Event) => {
    //   this.onClick(event);
    // });
  }

  // private onClick(event: Event) {
  //   setTimeout(() => {
  //     const clickedInside = this.el.nativeElement.contains(event.target as Node);
  //     const clickedOnIgnoredElement = this.ignoreClickOutside?.contains(event.target as Node);

  //     if (!clickedInside && !clickedOnIgnoredElement) {
  //       this.clickOutside.emit();
  //     }
  //   }, 0);
  // }

  ngOnDestroy() {
    if (this.unlisten) {
      this.unlisten();
    }
  }
}