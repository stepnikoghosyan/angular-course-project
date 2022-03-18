import { FormGroup, ValidationErrors } from '@angular/forms';

export function mustMatchValidator(sourceCtrlName: string, matchingCtrlName: string, sourceLabel: string, matchingLabel: string) {
  return (group: FormGroup): ValidationErrors | null => {
    const source = group.controls[sourceCtrlName];
    const matching = group.controls[matchingCtrlName];

    if (matching.errors && !matching.errors['mustMatch']) {
      return null;
    }

    const error = {
      mustMatch: {
        sourceControl: {
          label: sourceLabel,
          ctrlName: sourceCtrlName,
          value: source.value,
        },
        matchingControl: {
          label: matchingLabel,
          ctrlName: matchingCtrlName,
          value: matching.value,
        },
      },
    };

    if (source.value !== matching.value) {
      matching.setErrors(error);
    } else {
      matching.setErrors(null);
    }

    return source.value === matching.value ? null : error;
  };
}
