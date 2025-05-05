import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ChartComponent } from './components/chart/chart.component';
import { DynamicChartComponent } from './components/dynamicchart/dynamicchart.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, // default route
  { path: 'static', component: ChartComponent },
  { path: 'dynamic', component: DynamicChartComponent },
  { path: '**', redirectTo: '' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
