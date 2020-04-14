import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepoService } from '../shared/services/repo.service';

/**
 * Repository issues interface.
 *
 * @interface
 */
export interface RepoIssues {
  number: number;
  title: string;
  state: string;
  created_at: Date;
  updated_at: Date;
}

@Component({
  selector: 'app-bugs',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  /**
   * Columns to display in table compopnent.
   *
   * @type { string[] }
   */
  displayedColumns: string[] = ['number', 'title', 'state', 'created_at', 'updated_at'];

  /**
   * Data source for the table component.
   *
   * @type { MatTableDataSource<RepoIssues> }
   */
  dataSource: MatTableDataSource<RepoIssues>;
  
  /**
   * The selected repository name.
   *
   * @type { string }
   */
  repoName: string = '';

  /**
   * Constructor.
   *
   * @param { RepoService } repoService 
   */
  constructor(private repoService: RepoService) {
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
   }

   /**
    * OnInit hook that gets the data that needs to be set on table component.
    *
    * @returns { Promise<void> }
    */
  async ngOnInit(): Promise<void> {
    if (JSON.parse(localStorage.getItem('selectedRow'))) {
      let storedRow = JSON.parse(localStorage.getItem('selectedRow'));
      this.repoName = storedRow['data'].full_name;
    }
    try {
      let searchResults = await this.repoService.getSelectedRepoIssues(this.repoName).toPromise();
      this.dataSource = new MatTableDataSource(searchResults);
      let openIssues = searchResults.filter(item => item.state === 'open');
      let closedIssues = searchResults.filter(item => item.state === 'closed');
      localStorage.setItem('openIssues', JSON.stringify(openIssues.length));
      localStorage.setItem('closedIssues', JSON.stringify(closedIssues.length));
    } catch(err) {
      console.log(err);
    }
  }
}
