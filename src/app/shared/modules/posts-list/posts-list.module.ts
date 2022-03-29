import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules
import { LoadersModule } from '@shared/modules/loaders/loaders.module';

// components
import { PostsListComponent } from '@shared/modules/posts-list/components/posts-list/posts-list.component';
import { PostCardComponent } from '@shared/modules/posts-list/components/post-card/post-card.component';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { LazyImageModule } from '@shared/modules/lazy-image/lazy-image.module';

@NgModule({
  declarations: [
    PostsListComponent,
    PostCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoadersModule,
    DirectivesModule,
    LazyImageModule,
  ],
  exports: [
    PostsListComponent,
    PostCardComponent,
  ],
})
export class PostsListModule {
}
