import { ChangeDetectionStrategy, Component } from '@angular/core';

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

  public logout(): void {
    // TODO: implement
  }
}
