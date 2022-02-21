import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';
import { IndividualConfig } from 'ngx-toastr';

export interface INotificationConfig {
  type: NotificationTypes;
  message: string | string[];
  title?: string;
  overrideConfig?: Partial<IndividualConfig>;
}
