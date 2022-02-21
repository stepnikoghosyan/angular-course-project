import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent {
  @Input() public formCtrl: AbstractControl | null = null;
  @Input() public additionalMessages: { [key: string]: any } | null = null;
}
