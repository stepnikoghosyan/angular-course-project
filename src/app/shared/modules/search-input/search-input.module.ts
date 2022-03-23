import { NgModule } from '@angular/core';

// components
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  exports: [
    SearchComponent
  ],
})
export class SearchInputModule {
}
