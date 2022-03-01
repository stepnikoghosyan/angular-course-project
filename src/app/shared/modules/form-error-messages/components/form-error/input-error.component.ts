import { Component, DoCheck, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

// helpers
import { getErrorMessages } from '@shared/modules/form-error-messages/utils/error-messages.helper';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent implements DoCheck {
  @Input() public formCtrl: AbstractControl | null = null;
  @Input() public additionalMessages: { [key: string]: any } | null = null;
  @Input() public isMultiline = false;

  public messages: string[] = [];

  public isInvalid = false;

  private sharedErrorMessages = getErrorMessages();

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

  private valid(): void {
    if (!this.isInvalid) {
      return;
    }

    this.messages = [];
    this.isInvalid = false;
  }

  private invalid(): void {
    const errorsList: string[] = this.checkErrors();
    if (errorsList.length) {
      this.displayErrors(errorsList);
    }

    this.isInvalid = true;
  }

  private displayErrors(errors: string[]): void {
    if (this.isMultiline) {
      this.messages = errors;
    } else {
      this.messages = [errors.join(', ')];
    }
  }

  private checkErrors(): string[] {
    const errors: ValidationErrors | null = this.formCtrl!.errors;

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
