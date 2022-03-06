import { AfterViewInit, Directive, DoCheck, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'textarea[autoResizeTextarea]',
})
export class AutoResizeTextareaDirective implements DoCheck, AfterViewInit {
  @Input() public realtime = false;

  constructor(
    private readonly elRef: ElementRef<HTMLTextAreaElement>,
  ) {
  }

  ngDoCheck() {
    if (this.realtime) {
      this.updateHeight();
    }
  }

  ngAfterViewInit() {
    if (this.realtime) {
      this.updateHeight();
    }
  }

  private updateHeight(): void {
    this.elRef.nativeElement.style.height = 'auto';
    this.elRef.nativeElement.style.height = this.elRef.nativeElement.scrollHeight + 'px';
  }
}
