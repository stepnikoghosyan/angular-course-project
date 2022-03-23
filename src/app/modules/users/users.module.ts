import { NgModule } from '@angular/core';

// modules
import { UsersRoutingModule } from './users-routing.module';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';
import { SearchInputModule } from '@shared/modules/search-input/search-input.module';
import { CommonModule } from '@angular/common';

// components
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    UsersRoutingModule,
    LoadersModule,
    SearchInputModule,
    CommonModule,
  ],
})
export class UsersModule {
}
