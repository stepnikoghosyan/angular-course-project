import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { PostsRoutingModule } from './posts-routing.module';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';
import { CustomForms } from '@shared/modules/form-error-messages/custom-forms.module';

// components
import { PostsComponent } from './posts.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { ManagePostComponent } from './components/manage-post/manage-post.component';
import { CommentsComponent } from './components/comments/comments.component';

// directives
import { AutoResizeTextareaDirective } from './directives/auto-resize-textarea.directive';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
    PostsFilterComponent,
    CommentsComponent,
    AutoResizeTextareaDirective,
    PostCardComponent,
    PostViewComponent,
    ManagePostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    LoadersModule,
    CustomForms,
  ],
})
export class PostsModule {
}
