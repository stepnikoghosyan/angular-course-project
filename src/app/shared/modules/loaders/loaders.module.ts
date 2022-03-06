import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProgressBarComponent } from '@shared/modules/loaders/components/progress-bar/progress-bar.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ProgressBarComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SpinnerComponent,
    ProgressBarComponent,
  ],
})
export class LoadersModule {
}
