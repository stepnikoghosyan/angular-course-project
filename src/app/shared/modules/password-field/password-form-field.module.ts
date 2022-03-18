import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// components
import { PasswordFieldComponent } from '@shared/modules/password-field/password-field/password-field.component';

@NgModule({
  declarations: [
    PasswordFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    PasswordFieldComponent,
  ],
})
export class PasswordFormFieldModule {
}
