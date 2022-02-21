import { ModuleWithProviders, NgModule } from '@angular/core';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      autoDismiss: true,
      timeOut: 5000,
      extendedTimeOut: 1000,
      tapToDismiss: true,
    }),
  ],
})
export class NotificationsModule {
  static forRoot(): ModuleWithProviders<NotificationsModule> {
    return {
      ngModule: NotificationsModule,
      providers: [
        NotificationsService,
      ],
    };
  }
}
