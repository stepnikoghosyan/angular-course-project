import { AppRoutes } from '@shared/models/app-routes.model';

export function getFullRoute(route: AppRoutes): string {
  const config: { [key in AppRoutes]?: string } = {
    [AppRoutes.Login]: `${ AppRoutes.Auth }/${ AppRoutes.Login }`,
    [AppRoutes.Register]: `${ AppRoutes.Auth }/${ AppRoutes.Register }`,
    [AppRoutes.VerifyAccount]: `${ AppRoutes.Auth }/${ AppRoutes.VerifyAccount }`,
  };

  return config[route] || route;
}
