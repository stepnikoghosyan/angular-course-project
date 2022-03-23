import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { PostsRoutingModule } from './posts-routing.module';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';
import { CustomForms } from '@shared/modules/form-error-messages/custom-forms.module';
import { PostsListModule } from '@shared/modules/posts-list/posts-list.module';
import { CommentsModule } from '../comments/comments.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';

// components
import { PostsComponent } from './posts.component';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { ManagePostComponent } from './components/manage-post/manage-post.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostsFilterComponent,
    PostViewComponent,
    ManagePostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    LoadersModule,
    CustomForms,
    PostsListModule,
    CommentsModule,
    DirectivesModule,
  ],
})
export class PostsModule {
}
