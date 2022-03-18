import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[fileOrStringToImgSrc]',
})
export class FileOrStringToImgSrcDirective implements OnDestroy {
  @Input()
  public set imageSource(value: File | string) {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }

    if (!value) {
      this.elRef.nativeElement.setAttribute('src', '/assets/img/avatar-placeholder.png');
      return;
    }

    if (value instanceof File) {
      this.objectUrl = URL.createObjectURL(value);
      this.elRef.nativeElement.setAttribute('src', this.objectUrl);
    } else {
      this.elRef.nativeElement.setAttribute('src', value);
    }
  }

  private objectUrl?: string;

  constructor(
    private readonly elRef: ElementRef<HTMLImageElement>,
  ) {
  }

  ngOnDestroy() {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }
}
