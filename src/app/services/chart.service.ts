import { Injectable } from '@angular/core';
import { ChartData } from '../models/chart-data.model';

@Injectable({ providedIn: 'root' }) //i can use this service all over the application..its global
export class ChartService {
  getTechUsageData(): ChartData[] {
    return [
      { category: 'Coding', value: 35, extraInfo: 'Feature development, debugging' },
      { category: 'Meetings', value: 25, extraInfo: 'Team syncs and planning' },
      { category: 'Emails/Comms', value: 10, extraInfo: 'Communication and follow-ups' },
      { category: 'Learning', value: 15, extraInfo: 'Upskilling, documentation, courses' },
      { category: 'Breaks', value: 15, extraInfo: 'Rest and refresh' }
    ]
      ;
  }
}
