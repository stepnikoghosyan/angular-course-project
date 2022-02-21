import { NgModule } from '@angular/core';

// components
import { InputErrorComponent } from './components/form-error/input-error.component';

// directives
import { FormErrorDirective } from '@shared/modules/form-error-messages/directives/form-error.directive';

@NgModule({
  declarations: [
    InputErrorComponent,
    FormErrorDirective,
  ],
  imports: [],
  exports: [
    InputErrorComponent,
    FormErrorDirective,
  ],
})
export class FormErrorMessagesModule {
}
