import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

// components
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutComponent } from '@shared/modules/layout/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canLoad: [NotAuthGuard],
    canActivate: [NotAuthGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'not-found',
        component: NotFoundComponent,
      },
      {
        path: '**',
        redirectTo: 'not-found',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
