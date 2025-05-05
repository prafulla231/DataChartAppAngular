import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  title = 'Daily Productivity Dashboard';
  description = 'A visual breakdown of how your day is spent — track time across tasks like coding, meetings, and learning using interactive charts.';

}
