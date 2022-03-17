import { AbstractControl, ValidationErrors } from '@angular/forms';

export function imageMimeTypeValidator(allowedTypes?: string[]) {
  const types = allowedTypes || ['*'];

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control) {
      return null;
    }

    if (!control.value) {
      return null;
    }

    if (control.value instanceof File) {
      return new RegExp(`image\/(${types.join('|')})`).test(control.value.type) ? null : {
        imageMimeType: {
          allowedTypes: !!allowedTypes && allowedTypes.join(', ') || null,
          actualType: control.value.type,
        }
      };
    }

    return null;
  };
}
