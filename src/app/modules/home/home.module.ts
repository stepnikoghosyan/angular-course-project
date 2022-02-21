import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modules
import { HomeRoutingModule } from './home-routing.module';
import { LayoutModule } from '@shared/modules/layout/layout.module';

// components
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
  ],
})
export class HomeModule {
}
