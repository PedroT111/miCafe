import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {HTTP_INTERCEPTORS ,HttpClientModule} from '@angular/common/http';
import { BaseURLInterceptorService } from './core/interceptors/base-url-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { HomeComponent } from './features/home/index/home.component';
import { HomeBannerComponent } from './features/home/components/home-banner/home-banner.component';
import { HomeUsComponent } from './features/home/components/home-us/home-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeBannerComponent,
    HomeUsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
