import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  /**
   * The selected repository name.
   *
   * @type { string }
   */
  repoName: string = '';

  /**
   * Stores the canvas element.
   *
   * @type { any }
   */
  canvas: any;

  /**
   * Stores the canvas context.
   *
   * @type { any }
   */
  ctx: any;

  /**
   * Gets the repository name from locaStorage.
   */
  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('selectedRow'))) {
      let storedRow = JSON.parse(localStorage.getItem('selectedRow'));
      this.repoName = storedRow['data'].full_name;
    }
  }
  
  /**
   * Renders the chart.
   */
  ngAfterViewInit(): void {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let openIssues = JSON.parse(localStorage.getItem('openIssues'));
    let closedIssues = JSON.parse(localStorage.getItem('closedIssues'));
    new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["Open Issues", "Closed Issues"],
          datasets: [{
              label: '# of Votes',
              data: [openIssues, closedIssues],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
  }
}
