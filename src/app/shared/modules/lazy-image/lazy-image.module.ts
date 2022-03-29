import { NgModule } from '@angular/core';

// components
import { LazyImageComponent } from '@shared/modules/lazy-image/components/lazy-image.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LazyImageComponent,
  ],
  exports: [
    LazyImageComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class LazyImageModule {
}
