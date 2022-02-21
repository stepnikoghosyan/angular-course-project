import { ValidationErrors } from '@angular/forms';

export function getErrorMessages(): { [key: string]: any } {
  return {
    required: 'Required',
    email: 'Invalid email',
    minlength: (error: ValidationErrors): string => {
      return `Please enter at least ${ error['requiredLength'] } characters.`;
    },
  };
}
