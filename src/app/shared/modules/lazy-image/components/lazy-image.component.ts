import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImageComponent {
  @Input()
  public set src(value: string | null | undefined) {
    if (!!value) {
      this.imageSrc = value;
      this.isLoading = true;
      this.cdr.markForCheck();
    } else if (!!this.imageSrc) {
      this.imageSrc = this.defaultImageSrc;
      this.cdr.markForCheck();
    }
  }

  @Input() public containerClass = '';
  @Input() public defaultImageSrc = '/assets/img/no-image.png';

  public imageSrc?: string;

  public isLoading = true;


  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  public imageLoadingSuccess(): void {
    this.isLoading = false;
  }

  public imageLoadingError(): void {
    this.imageSrc = this.defaultImageSrc;
    this.cdr.markForCheck();
  }
}
