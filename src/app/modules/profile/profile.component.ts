import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// validators
import { imageMimeTypeValidator } from '../posts/validators/image-mime-type.validator';
import { fileSizeValidator } from '../posts/validators/file-size.validator';
import { notOnlySpacesValidator } from '@shared/validators/not-only-spaces.validator';
import { emailValidator } from '../auth/validators/email.validator';
import { mustMatchValidator } from './validators/must-match.validator';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public form: FormGroup;

  public isLoading = false;

  public responseErrorMsg: string | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.initAndGetForm();
  }

  private initAndGetForm(): FormGroup {
    return this.formBuilder.group({
      image: ['', [imageMimeTypeValidator(['jpg', 'jpeg', 'png']), fileSizeValidator(1024 * 1024)]], // 1 MB
      firstName: ['', [Validators.required, notOnlySpacesValidator]],
      lastName: ['', [Validators.required, notOnlySpacesValidator]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: [mustMatchValidator('password', 'confirmPassword', 'Password', 'Confirm Password')],
    });
  }

  public onFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!!files && files.length > 0) {
      const file = files[0];
      this.form.controls['image'].setValue(file);
      this.form.controls['image'].markAsTouched();
    }
  }

  public clearFileInput(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.form.controls['image'].setValue(null);
  }

  public onSubmit(): void {
    console.log(this.form.controls);
  }
}
