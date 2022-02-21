import { NgModule } from '@angular/core';

// components
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    SpinnerComponent,
  ],
  exports: [
    SpinnerComponent,
  ],
})
export class LoadersModule {
}
