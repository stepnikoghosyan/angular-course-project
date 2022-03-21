import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

// helpers
import { getErrorMessages } from '@shared/modules/form-error-messages/utils/error-messages.helper';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldErrorComponent implements OnChanges {
  @Input() public errors: ValidationErrors | null = null;
  @Input() public showErrors = false;
  @Input() public additionalErrorMessages: { [key: string]: any } | null = null;
  @Input() public isMultiline = false;

  public messages: string[] = [];

  private sharedErrorMessages = getErrorMessages();

  ngOnChanges(changes: SimpleChanges) {
    if (!this.showErrors) {
      return;
    }

    if (!this.errors) {
      return;
    }

    this.checkErrors();
  }

  private checkErrors(): void {
    const errorsList: string[] = this.getErrorMessages();
    if (errorsList.length) {
      if (this.isMultiline) {
        this.messages = errorsList;
      } else {
        this.messages = [errorsList.join(', ')];
      }
    }
  }

  private getErrorMessages(): string[] {
    const messagesList: string[] = [];

    for (let key in this.errors) {
      if (this.errors.hasOwnProperty(key)) {
        messagesList.push(this.getMessageFromSharedOrCustomList(key, this.errors[key]));
      }
    }

    return messagesList;
  }

  private getMessageFromSharedOrCustomList(errorKey: string, error: ValidationErrors | boolean): string {
    const thereAreCustomMessages = typeof this.additionalErrorMessages === 'object' && this.additionalErrorMessages !== null && this.additionalErrorMessages.hasOwnProperty(errorKey);

    if (thereAreCustomMessages) {
      return this.getMessage(errorKey, error, this.additionalErrorMessages!);
    } else if (this.sharedErrorMessages[errorKey]) {
      return this.getMessage(errorKey, error, this.sharedErrorMessages);
    }

    return errorKey;
  }

  private getMessage(errorKey: string, error: ValidationErrors | boolean, errorsMessages: { [key: string]: any }): string {
    if (typeof errorsMessages[errorKey] === 'string') {
      // Static error message
      return errorsMessages[errorKey];
    } else if (typeof errorsMessages[errorKey] === 'function') {
      // Dynamic error message
      return errorsMessages[errorKey](error);
    }

    return errorKey;
  }
}
