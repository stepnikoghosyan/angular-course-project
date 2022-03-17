import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { PostsRoutingModule } from './posts-routing.module';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';

// components
import { PostsComponent } from './posts.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';
import { CommentsComponent } from './components/comments/comments.component';

// directives
import { AutoResizeTextareaDirective } from './directives/auto-resize-textarea.directive';
import { PostViewComponent } from './components/post-view/post-view.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
    PostsFilterComponent,
    CommentsComponent,
    AutoResizeTextareaDirective,
    PostCardComponent,
    PostViewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    LoadersModule,
  ],
})
export class PostsModule {
}
