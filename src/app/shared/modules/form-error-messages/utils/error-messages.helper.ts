import { ValidationErrors } from '@angular/forms';

export function getErrorMessages(): { [key: string]: any } {
  return {
    required: 'Required',
    email: 'Invalid email',
    onlySpaces: 'Input cannot contain only spaces',
    minlength: (error: ValidationErrors): string => {
      console.log('error:', error);
      return `Please enter at least ${ error['requiredLength'] } characters.`;
    },
    imageMimeType: (error: ValidationErrors): string => {
      if (error['allowedTypes']) {
        return `Invalid file type. Allowed types are: ${ error['allowedTypes'] }`;
      }
      return `Invalid file type, only images are allowed`;
    },
    fileSize: (error: ValidationErrors): string => {
      // Convert Byte to MB
      const maxAllowedSizeInMb = (error['maxAllowedSize'] / 1024 / 1024).toFixed(1);
      const actualSizeInMb = (error['actualSize'] / 1024 / 1024).toFixed(1);

      return `Maximum allowed file size is ${ maxAllowedSizeInMb }MB, selected image is ${ actualSizeInMb }MB`;
    },
    mustMatch: (error: ValidationErrors): string => {
      const sourceLabel = error['sourceControl']['label'];
      const matchingLabel = error['matchingControl']['label'];

      return `${ sourceLabel } and ${ matchingLabel } should be same`;
    },
  };
}
