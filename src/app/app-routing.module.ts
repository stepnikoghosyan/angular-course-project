import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

// components
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutComponent } from '@shared/modules/layout/components/layout/layout.component';

// models
import { AppRoutes } from '@shared/models/app-routes.model';

// helpers
import { getFullRoute } from '@shared/utils/get-full-route.helper';

const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Auth,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Auth,
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
        path: AppRoutes.Home,
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: AppRoutes.Posts,
        loadChildren: () => import('./modules/posts/posts.module').then(m => m.PostsModule),
      },
      {
        path: AppRoutes.Profile,
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: AppRoutes.NotFound,
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
    redirectTo: getFullRoute(AppRoutes.Login),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
