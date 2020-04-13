import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepoService } from '../repo.service';

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
  displayedColumns: string[] = ['number', 'title', 'state', 'created_at', 'updated_at'];
  dataSource: MatTableDataSource<RepoIssues>;

  constructor(private repoService: RepoService) {
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
   }

  async ngOnInit(): Promise<void> {
    try {
      let searchResults = await this.repoService.getSelectedRepoIssues('twbs/bootstrap').toPromise();
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
