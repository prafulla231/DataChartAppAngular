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
  //@ViewChild is used to query the template for the element with the specified template reference variable. The result is stored in a property of type ElementRef:


  //elementRef is a wrapper around a native DOM element. It provides a way to access the underlying DOM element directly.most basic abstraction.only holds the native element.... exposes the DOM node via .nativeElement.

  //why ?? =>Charts work with plain DOM elements, not Angular components.. must get the raw element to pass into ECharts.

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

      tooltip: { //after hovering display something
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

      series: [ //To fill data/display
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

/*
/* ==========================================================================================

 - @Component: Angular decorator for UI component definition.
 - standalone: true ➝ No need to declare in a module (Angular 14+ feature).
 //dom queries
 - ViewChild: To access chart DOM via ElementRef.returns only one reference
 - HostListener: Listens to window resize and resizes ECharts.

 🌀 LIFECYCLE HOOKS
 ------------------------------------------------------------------------------------------------
 - ngOnInit(): Fetches chart data from ChartService.
 - ngAfterViewInit(): Initializes ECharts chart once view DOM is ready.

 🧠 DATA FLOW
 ------------------------------------------------------------------------------------------------
 - chartData is of type ChartData[] { category, value, extraInfo? }
 - Data comes from a service method: chartService.getTechUsageData()
 - ChartType is reactive (pie/bar), and chart is re-initialized on change.

 🖼️ CHART INITIALIZATION: initChart()
 ------------------------------------------------------------------------------------------------
 - echarts.init(): Initializes the chart in chartContainer div.
 - chartOptions: Holds all chart configuration.
 - setOption(): Renders chart using defined options.

 🎨 CHART CUSTOMIZATION DETAILS
 ------------------------------------------------------------------------------------------------
 Title:
   • Center aligned, custom font, color.

 Tooltip:
   • Triggered on item hover.
   • Custom formatter shows name, % value, and extraInfo (if present).

 Axes (Conditional - for non-pie):
   • Custom label styles, axis lines.
   • Only visible for bar chart.

 Series:
   • Dynamically maps chartData to series data.
   • Type: chartType (bar/pie)
   • Uses color palette, styling, emphasis effects.
   • Radius & barWidth conditionally applied for pie/bar respectively.

 💡 DYNAMIC FEATURES
 ------------------------------------------------------------------------------------------------
 - Chart type change triggers complete reinitialization (onChartTypeChange).
 - Responsive resizing using HostListener on window resize.
 - Smooth animation: elasticOut, 1000ms.

 📎 TEMPLATE USAGE (Assumed - for understanding)
 ------------------------------------------------------------------------------------------------
 <select (change)="onChartTypeChange($event)">
   <option value="pie">Pie</option>
   <option value="bar">Bar</option>
 </select>
 <div #chartContainer style="height: 400px; width: 100%;"></div>

 ========================================================================================== */


