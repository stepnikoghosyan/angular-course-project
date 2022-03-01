import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { InputErrorComponent } from './components/form-error/input-error.component';

@NgModule({
  declarations: [
    InputErrorComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InputErrorComponent,
  ],
})
export class FormErrorMessagesModule {
}
