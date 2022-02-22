import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

// models
import { AppRoutes } from '@shared/models/app-routes.model';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AppRoutes.Login,
      },
      {
        path: AppRoutes.Login,
        component: LoginComponent,
      },
      {
        path: AppRoutes.Register,
        component: RegisterComponent,
      },
      {
        path: AppRoutes.ForgotPassword,
        component: ForgotPasswordComponent,
      },
      {
        path: `${ AppRoutes.ResetPassword }/:resetPasswordToken`,
        component: ResetPasswordComponent,
      },
      {
        path: `${ AppRoutes.VerifyAccount }/:activationToken`,
        component: VerifyAccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
