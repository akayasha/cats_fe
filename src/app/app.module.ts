import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FeedComponent } from '../feed/feed.component';
import { HttpClientModule } from '@angular/common/http';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';


@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppComponent, FeedComponent, ErrorDialogComponent, AppComponent],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
