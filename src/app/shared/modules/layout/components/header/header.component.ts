import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class HeaderComponent {

  public readonly currentUserProfilePicture: string;
  public readonly navigationItems = getNavigationItemsConfig();

  public readonly routes = {
    myPosts: [getFullRoute(AppRoutes.Posts)],
    profile: getFullRoute(AppRoutes.Profile),
  };

  constructor(
    private readonly authService: AuthService,
    public readonly appStateService: AppStateService,
  ) {
    this.currentUserProfilePicture = this.appStateService.currentUser?.profilePictureUrl || '/assets/img/post-image-placeholder.png';
  }

  public logout(): void {
    this.authService.logout();
  }
}
