import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MazeSetupComponent} from './maze-setup/maze-setup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MazeService} from './maze.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppInterceptor} from './app.interceptor';
import {HttpClientModule} from '@angular/common/http';
import { MazeComponent } from './maze/maze.component';
import {SolutionService} from './solution.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule} from 'angular2-toaster';


@NgModule({
  declarations: [
    AppComponent,
    MazeSetupComponent,
    MazeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    MazeService,
    SolutionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
