import { AbstractControl, ValidationErrors } from '@angular/forms';

export function fileSizeValidator(size?: number) {
  const maxFileSize = size || 2 * 1024 * 1024; // 2 MB
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control) {
      return null;
    }

    if (!control.value) {
      return null;
    }

    if (control.value instanceof File) {
      return control.value.size <= maxFileSize ? null : {
        fileSize: {
          maxAllowedSize: maxFileSize,
          actualSize: control.value.size,
        }
      };
    }

    return null;
  };
}
