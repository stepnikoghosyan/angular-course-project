import { AppRoutes } from '@shared/models/app-routes.model';

export function getFullRoute(route: AppRoutes): string {
  const config: { [key in AppRoutes]?: string } = {
    [AppRoutes.Login]: `${ AppRoutes.Auth }/${ AppRoutes.Login }`,
    [AppRoutes.Register]: `${ AppRoutes.Auth }/${ AppRoutes.Register }`,
    [AppRoutes.VerifyAccount]: `${ AppRoutes.Auth }/${ AppRoutes.VerifyAccount }`,
    [AppRoutes.CreatePost]: `${ AppRoutes.Posts }/${ AppRoutes.CreatePost }`,
    [AppRoutes.UpdatePost]: `${ AppRoutes.Posts }/${ AppRoutes.UpdatePost }`,
  };

  console.log(config[route] || route);

  return config[route] && `/${ config[route] }` || route;
}
