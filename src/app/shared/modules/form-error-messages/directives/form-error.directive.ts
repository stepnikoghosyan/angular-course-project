import { Directive, DoCheck, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

// helpers
import { getErrorMessages } from '@shared/modules/form-error-messages/utils/error-messages.helper';

@Directive({
  selector: '[appInputError]',
})
export class FormErrorDirective implements DoCheck {
  @Input('appInputErrorOf') public formCtrl: AbstractControl | null;
  @Input('appInputErrorAdditionalMessages') public additionalMessages: { [key: string]: string } | null = null;

  private lastState: 'valid' | 'invalid';

  private sharedErrorMessages = getErrorMessages();

  constructor(
    protected readonly templateRef: TemplateRef<any>,
    protected readonly viewContainerRef: ViewContainerRef,
  ) {
  }

  ngDoCheck() {
    if (!this.formCtrl) {
      return;
    }

    if (this.formCtrl.untouched) {
      return;
    }

    if (this.formCtrl.invalid) {
      this.invalid();
    } else {
      this.valid();
    }
  }

  private invalid(): void {
    const errorsList: string[] = this.checkErrors();
    this.displayErrors(errorsList);
    this.lastState = 'invalid';
  }

  private valid(): void {
    if (this.lastState === 'valid') return;
    this.viewContainerRef.clear();
    this.lastState = 'valid';
  }

  private displayErrors(errors: string[]): void {
    this.viewContainerRef.clear();
    this.viewContainerRef.createEmbeddedView(this.templateRef, { $implicit: errors.join(', ') });
  }

  private checkErrors(): string[] {
    const errors: ValidationErrors | null = this.formCtrl!.errors;

    console.log('errors:',errors);

    const messagesList: string[] = [];

    for (let key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (typeof errors[key] === 'string') {
          // Backend error (angular errors are objects of type ValidationErrors)
          messagesList.push(errors[key]);
        } else {
          // Angular form error
          messagesList.push(this.getMessageFromSharedOrCustomList(key, errors[key]));
        }
      }
    }

    console.log('messagesList:',messagesList);
    return messagesList;
  }

  private getMessageFromSharedOrCustomList(errorKey: string, error: ValidationErrors | boolean): string {
    const thereAreCustomMessages = typeof this.additionalMessages === 'object' && this.additionalMessages !== null && this.additionalMessages.hasOwnProperty(errorKey);

    if (thereAreCustomMessages) {
      return this.getMessage(errorKey, error, this.additionalMessages);
    } else if (this.sharedErrorMessages[errorKey]) {
      return this.getMessage(errorKey, error, this.sharedErrorMessages);
    }

    return errorKey;
  }

  private getMessage(errorKey: string, error: ValidationErrors | boolean, errors: any): string {
    if (typeof errors[errorKey] === 'string') {
      // Static error message
      return errors[errorKey];
    } else if (typeof errors[errorKey] === 'function') {
      // Dynamic error message
      return errors[errorKey](error);
    }

    return errorKey;
  }
}
