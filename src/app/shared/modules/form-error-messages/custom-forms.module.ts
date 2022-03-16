import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';

@NgModule({
  declarations: [
    FormFieldComponent,
    FormFieldErrorComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormFieldComponent,
    FormFieldErrorComponent,
  ],
})
export class CustomForms {
}
