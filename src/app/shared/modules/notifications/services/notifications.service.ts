import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

// models
import { INotificationConfig } from '@shared/modules/notifications/models/notification-config.model';

// configs
import { getNotificationClassesByType } from '@shared/modules/notifications/configs/get-notification-classes-by-type.config';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly toastrService: ToastrService,
  ) {
  }

  public showNotification(config: INotificationConfig): void {
    const toastType = getNotificationClassesByType(config.type);

    const data: Partial<IndividualConfig> = {
      ...config.overrideConfig,
    };
    let notificationMessage: string;

    if (Array.isArray(config.message)) {
      notificationMessage = config.message.join('</br>');
      data.enableHtml = true;
    } else {
      notificationMessage = config.message;
    }

    this.toastrService.show(notificationMessage, config.title, data, toastType);
  }
}
