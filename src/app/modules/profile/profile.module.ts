import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { ProfileRoutingModule } from './profile-routing.module';
import { CustomForms } from '@shared/modules/form-error-messages/custom-forms.module';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';
import { PasswordFormFieldModule } from '@shared/modules/password-field/password-form-field.module';

// components
import { ProfileComponent } from './profile.component';

// directives
import { FileOrStringToImgSrcDirective } from './directives/file-or-string-to-img-src.directive';

@NgModule({
  declarations: [
    ProfileComponent,
    FileOrStringToImgSrcDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    CustomForms,
    LoadersModule,
    PasswordFormFieldModule,
  ],
})
export class ProfileModule {
}
