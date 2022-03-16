import { Component, ContentChild, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {

  @Input() public label?: string;
  @Input() public showMultilineErrors = false;
  @Input() public customErrorMessages: { [key: string]: any } | null = null;
  @Input() public labelFor?: string;

  @ContentChild(NgControl) public ngControl?: NgControl;
}
