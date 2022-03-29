import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// services
import { AuthService } from '../../../../../modules/auth/services/auth.service';
import { AppStateService } from '../../../../../services/app-state.service';

// models
import { AppRoutes } from '@shared/models/app-routes.model';

// configs
import { getNavigationItemsConfig } from '@shared/modules/layout/configs/navigation-items.config';

// helpers
import { getFullRoute } from '@shared/utils/get-full-route.helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {

  public readonly navigationItems = getNavigationItemsConfig();

  public currentUserId?: number;
  public currentUserProfilePicture = '/assets/img/no-image.png';

  public readonly routes = {
    posts: [getFullRoute(AppRoutes.Posts)],
    profile: getFullRoute(AppRoutes.Profile),
  };

  private subscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly appStateService: AppStateService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.subscription = this.appStateService.getCurrentUser()
      .subscribe({
        next: (val) => {
          this.currentUserId = val?.id;
          this.currentUserProfilePicture = val?.profilePictureUrl || '/assets/img/no-image.png';

          this.cdr.markForCheck();
        },
      });
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
