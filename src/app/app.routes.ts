import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChartComponent } from './components/chart/chart.component';
import { DynamicchartComponent } from './components/dynamicchart/dynamicchart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'static', component: ChartComponent },
  { path: 'dynamic', component: DynamicchartComponent },
  { path: '**', redirectTo: '' }
];
