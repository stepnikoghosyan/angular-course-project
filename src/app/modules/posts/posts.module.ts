import { NgModule } from '@angular/core';

// modules
import { PostsRoutingModule } from './posts-routing.module';

// components
import { PostsComponent } from './posts.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';
import { CommonModule } from '@angular/common';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';
import { CommentsDialogComponent } from './components/comments-dialog/comments-dialog.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
    PostsFilterComponent,
    CommentsDialogComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    LoadersModule,
  ],
})
export class PostsModule {
}
