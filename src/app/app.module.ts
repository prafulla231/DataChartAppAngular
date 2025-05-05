import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { ChartComponent } from './components/chart/chart.component';
import { DynamicChartComponent } from './components/dynamicchart/dynamicchart.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,

    // 👇 Only needed if these components are standalone (Angular 17+)
    HeaderComponent,
    ChartComponent,
    DynamicChartComponent,
    HomeComponent,
  ],
  declarations: [
    //AppComponent,
    // Don’t declare standalone components here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
