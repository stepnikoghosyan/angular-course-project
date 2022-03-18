import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { AuthRoutingModule } from './auth-routing.module';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';
import { CustomForms } from '@shared/modules/form-error-messages/custom-forms.module';
import { PasswordFormFieldModule } from '@shared/modules/password-field/password-form-field.module';

// components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    VerifyAccountComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomForms,
    LoadersModule,
    PasswordFormFieldModule,
  ],
})
export class AuthModule {
}
