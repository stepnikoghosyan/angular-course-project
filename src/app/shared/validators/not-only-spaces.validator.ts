import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notOnlySpacesValidator(control: AbstractControl): ValidationErrors | null {
  if (!control) {
    return null;
  }

  if (!control.value) {
    return null;
  }

  return !!control.value.trim() ? null : { onlySpaces: true };
}
