import { INavigationItemsConfig } from '@shared/modules/layout/models/navigation-items-config.model';

export function getNavigationItemsConfig(): INavigationItemsConfig[] {
  return [
    {
      label: 'Home',
      route: '/home',
      routerLinkActive: 'custom-active',
    },
    {
      label: 'Users',
      route: '/users',
      routerLinkActive: 'custom-active',
    },
    {
      label: 'Posts',
      route: '/posts',
      routerLinkActive: 'custom-active',
    },
    {
      label: 'Comments',
      route: '/comments',
      routerLinkActive: 'custom-active',
    },
  ];
}
