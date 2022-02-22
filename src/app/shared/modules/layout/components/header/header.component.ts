import { ChangeDetectionStrategy, Component } from '@angular/core';

// services
import { AuthService } from '../../../../../modules/auth/services/auth.service';

// configs
import { getNavigationItemsConfig } from '@shared/modules/layout/configs/navigation-items.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  public readonly navigationItems = getNavigationItemsConfig();

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  public logout(): void {
    console.log('logout');
    this.authService.logout();
  }
}
