import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';

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

    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    HeaderComponent,
    ChartComponent,
    DynamicChartComponent,
    HomeComponent,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
