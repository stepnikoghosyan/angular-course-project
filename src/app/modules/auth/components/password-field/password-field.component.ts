import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFieldComponent),
      multi: true,
    },
  ],
})
export class PasswordFieldComponent implements ControlValueAccessor {
  public showPasswordAsText = false;

  public value = '';

  public change(value: string): void {
    this.writeValue(value);
  }

  public onBlur(): void {
    this.writeValue(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
    this.emitChanges();
  }

  private emitChanges(): void {
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  public toggleViewMode(): void {
    this.showPasswordAsText = !this.showPasswordAsText;
  }

  private onChange: Function = function () {
  };
  private onTouch: Function = function () {
  };

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
