import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { CovidDataService } from '../../services/covid-data.service';

@Component({
  selector: 'app-dynamic-chart',
  standalone: true,
  templateUrl: './dynamicchart.component.html',
  imports: [
    CommonModule,
    NgxEchartsModule
  ]
})
export class DynamicChartComponent implements OnInit, AfterViewInit {
  chartOption: any;
  isLoading = true;
  error: string | null = null;

  labels: string[] = [];
  values: number[] = [];
  chartReady = false;

  constructor(private covidService: CovidDataService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    // Ensure DOM is ready and chart container is sized
    setTimeout(() => {
      this.chartReady = true;
      this.tryRenderChart();
    }, 0);
  }

  fetchData(): void {
    this.covidService.getLatestRegionalData().subscribe({
      next: res => {
        if (!res || !res.data || !Array.isArray(res.data) || res.data.length === 0) {
          this.error = 'No data available.';
          this.isLoading = false;
          return;
        }

        const latest = res.data[res.data.length - 1];
        if (!latest || !latest.regional) {
          this.error = 'Incomplete data received.';
          this.isLoading = false;
          return;
        }

        this.labels = latest.regional.map((r: any) => r.loc);
        this.values = latest.regional.map((r: any) => r.totalConfirmed);
        this.isLoading = false;

        this.tryRenderChart(latest.day);
      },
      error: err => {
        console.error('Data fetch error:', err);
        this.error = 'Failed to load data.';
        this.isLoading = false;
      }
    });
  }

  tryRenderChart(dateStr?: string): void {
    if (!this.chartReady || this.labels.length === 0 || this.values.length === 0) return;

    this.chartOption = {
      title: { text: `COVID-19 Cases by State (${dateStr || ''})` },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.labels,
        axisLabel: { rotate: 45 }
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Total Confirmed',
          data: this.values,
          type: 'bar',
          itemStyle: { color: '#007acc' }
        }
      ]
    };
  }
}
