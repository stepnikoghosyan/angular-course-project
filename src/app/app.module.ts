import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// modules
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@shared/modules/layout/layout.module';
import { NotificationsModule } from '@shared/modules/notifications/notifications.module';

// interceptors
import { interceptors } from './interceptors/index.interceptor';

// components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NotificationsModule.forRoot(),
    LayoutModule,
  ],
  providers: [
    interceptors,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
