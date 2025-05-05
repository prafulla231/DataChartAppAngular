import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as echarts from 'echarts';
import { ChartService } from '../../services/chart.service';
import { ChartData } from '../../models/chart-data.model';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  chartInstance!: echarts.ECharts;
  chartType: string = 'pie';
  chartOptions: any;
  chartData: ChartData[] = [];

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartData = this.chartService.getTechUsageData();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  onChartTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.chartType = value;
    this.initChart();
  }

  initChart(): void {
    if (!this.chartContainer?.nativeElement) return;

    this.chartInstance = echarts.init(this.chartContainer.nativeElement);

    // 🎨 Updated color palette (soft and distinct)
    const colors = ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948', '#b07aa1'];

    this.chartOptions = {
      backgroundColor: '#f4f7fb',
      title: {
        text: 'Daily Personal Productivity Breakdown (%)',
        left: 'center',
        textStyle: {
          fontSize: 20,
          color: '#003366'
        }
      },

      tooltip: {
        trigger: 'item',
        backgroundColor: '#ffffff',
        borderColor: '#333',
        borderWidth: 1,
        textStyle: {
          color: '#000',
          fontWeight: 'bold',
          fontSize: 14
        },
        formatter: (params: any) => {
          const info = this.chartData[params.dataIndex]?.extraInfo || '';
          return `${params.name}: ${params.value}%<br/><small>${info}</small>`;
        }
      },

      xAxis: this.chartType !== 'pie' ? {
        type: 'category',
        data: this.chartData.map(d => d.category),
        axisLine: {
          lineStyle: { color: '#000' }
        },
        axisLabel: {
          color: '#000',
          fontSize: 14,
          fontWeight: 'bold'
        },
        splitLine: { show: false }
      } : undefined,

      yAxis: this.chartType !== 'pie' ? {
        type: 'value',
        axisLine: {
          lineStyle: { color: '#000' }
        },
        axisLabel: {
          color: '#000',
          fontSize: 14,
          fontWeight: 'bold'
        },
        splitLine: {
          lineStyle: { color: '#ccc' }
        }
      } : undefined,

      series: [
        {
          name: 'Time Spent',
          type: this.chartType,
          data: this.chartData.map((d, i) => ({
            value: d.value,
            name: d.category,
            itemStyle: {
              color: colors[i % colors.length],
              borderRadius: this.chartType === 'bar' ? [6, 6, 0, 0] : 0
            }
          })),
          radius: this.chartType === 'pie' ? '60%' : undefined,
          barWidth: this.chartType === 'bar' ? '50%' : undefined,

          emphasis: {
            scale: true,
            itemStyle: {
              borderColor: '#000',
              borderWidth: 2,
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.6)'
            },
            label: {
              show: true,
              fontWeight: 'bold',
              color: '#000'
            }
          },

          animationEasing: 'elasticOut',
          animationDuration: 1000
        }
      ]
    };

    this.chartInstance.setOption(this.chartOptions);
  }
}
