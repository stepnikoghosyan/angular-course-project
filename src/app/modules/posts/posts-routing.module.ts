import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
  },
  {
    path: ':id',
    component: PostViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {
}
