import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  favouriteMovies: string[] = [];
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getMovies().subscribe({
      next: (data) => (this.favouriteMovies = data),
    });
  }
}
