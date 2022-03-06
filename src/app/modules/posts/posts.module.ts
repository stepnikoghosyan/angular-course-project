import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { PostsRoutingModule } from './posts-routing.module';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';

// components
import { PostsComponent } from './posts.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';
import { CommentsDialogComponent } from './components/comments-dialog/comments-dialog.component';

// directives
import { AutoResizeTextareaDirective } from './directives/auto-resize-textarea.directive';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
    PostsFilterComponent,
    CommentsDialogComponent,
    AutoResizeTextareaDirective,
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
