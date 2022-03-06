import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[autoResizeTextarea]',
})
export class AutoResizeTextareaDirective implements OnInit, OnDestroy {
  @Input() public isReadonly = true;

  constructor(
    private readonly elRef: ElementRef<HTMLTextAreaElement>,
  ) {
  }

  ngOnInit() {
    if (!this.isReadonly) {
      this.listenToValueChanges();
    }
  }

  private listenToValueChanges(): void {
    this.elRef.nativeElement.addEventListener('input', this.updateHeight);
  }

  private updateHeight = () => {
    this.elRef.nativeElement.style.height = 'auto';
    this.elRef.nativeElement.style.height = this.elRef.nativeElement.scrollHeight + 'px';
  };

  ngOnDestroy() {
    if (!this.isReadonly) {
      this.elRef.nativeElement.removeEventListener('input', this.updateHeight);
    }
  }
}
