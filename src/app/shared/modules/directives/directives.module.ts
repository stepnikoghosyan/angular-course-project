import { NgModule } from '@angular/core';

// directives
import { AutoResizeTextareaDirective } from '@shared/modules/directives/directives/auto-resize-textarea.directive';

@NgModule({
  declarations: [
    AutoResizeTextareaDirective,
  ],
  exports: [
    AutoResizeTextareaDirective,
  ],
})
export class DirectivesModule {
}
