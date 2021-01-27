import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgxsModule } from '@ngxs/store';
import { AppState } from "./state/app.state";
import { AppConfig } from './shared/services/app-config.service';
import { APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true }
 ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MaterialModule,
    NgxsModule.forRoot([AppState]),
    AppRoutingModule, HttpClientModule
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
