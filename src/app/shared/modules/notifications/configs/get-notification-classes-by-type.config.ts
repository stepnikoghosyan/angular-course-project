import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';

export function getNotificationClassesByType(type: NotificationTypes): string {
  const config = {
    [NotificationTypes.SUCCESS]: 'toast-success',
    [NotificationTypes.ERROR]: 'toast-error',
    [NotificationTypes.WARNING]: 'toast-info',
  };

  return config[type];
}
