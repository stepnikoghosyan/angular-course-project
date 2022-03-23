import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// modules
import { PostsRoutingModule } from './posts-routing.module';
import { LoadersModule } from '@shared/modules/loaders/loaders.module';
import { CustomForms } from '@shared/modules/form-error-messages/custom-forms.module';
import { PostsListModule } from '@shared/modules/posts-list/posts-list.module';
import { CommentsModule } from '../comments/comments.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { SearchInputModule } from '@shared/modules/search-input/search-input.module';

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
    NgSelectModule,
    PostsRoutingModule,
    LoadersModule,
    CustomForms,
    PostsListModule,
    CommentsModule,
    DirectivesModule,
    FormsModule,
    SearchInputModule,
  ],
})
export class PostsModule {
}
