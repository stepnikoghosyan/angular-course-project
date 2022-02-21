import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { AuthRoutingModule } from './auth-routing.module';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';

// components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormErrorMessagesModule } from '@shared/modules/form-error-messages/form-error-messages.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorMessagesModule,
    LoadersModule,
  ],
})
export class AuthModule {
}
