import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// components
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from '@shared/modules/layout/components/header/header.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LayoutComponent,
  ],
})
export class LayoutModule {
}
