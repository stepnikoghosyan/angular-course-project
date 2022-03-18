// models
import { INavigationItemsConfig } from '@shared/modules/layout/models/navigation-items-config.model';
import { AppRoutes } from '@shared/models/app-routes.model';

// helpers
import { getFullRoute } from '@shared/utils/get-full-route.helper';

export function getNavigationItemsConfig(): INavigationItemsConfig[] {
  return [
    {
      label: 'Home',
      route: getFullRoute(AppRoutes.Home),
      routerLinkActive: 'custom-active',
    },
    {
      label: 'Users',
      route: '/users', // TODO: update
      routerLinkActive: 'custom-active',
    },
    {
      label: 'Posts',
      route: getFullRoute(AppRoutes.Posts),
      routerLinkActive: 'custom-active',
    },
  ];
}
