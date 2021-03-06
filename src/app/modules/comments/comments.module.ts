import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// modules
import { LoadersModule } from '@shared/modules/loaders/loaders.module';
import { DirectivesModule } from '@shared/modules/directives/directives.module';
import { LazyImageModule } from '@shared/modules/lazy-image/lazy-image.module';

// components
import { CommentsComponent } from './components/comments/comments.component';

@NgModule({
  declarations: [
    CommentsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoadersModule,
    DirectivesModule,
    LazyImageModule,
  ],
  exports: [
    CommentsComponent,
  ],
})
export class CommentsModule {
}
