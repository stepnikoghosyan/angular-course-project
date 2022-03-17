import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { ManagePostComponent } from './components/manage-post/manage-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
  },
  {
    path: 'create',
    component: ManagePostComponent,
  },
  {
    path: 'edit/:id',
    component: ManagePostComponent,
  },
  {
    path: ':id',
    component: PostViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {
}
