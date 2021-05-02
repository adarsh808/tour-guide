import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationMapComponent } from './components/navigation-map/navigation-map.component';
import { FormsModule } from '@angular/forms';
import {SharedModule} from './shared/shared.module'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AppComponent, NavigationMapComponent],
  imports: [BrowserModule, AppRoutingModule,FormsModule,SharedModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
