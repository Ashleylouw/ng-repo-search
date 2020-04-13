import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepoService } from '../repo.service';

export interface RepoData {
  full_name: string;
  description: string;
  actions: {};
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  displayedColumns: string[] = ['full_name', 'description', 'actions'];
  dataSource: MatTableDataSource<RepoData>;

  constructor(private repoService: RepoService) {
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
   }

  async ngOnInit(): Promise<void> {
    try {
      let searchResults = await this.repoService.getRepo('bootstrap').toPromise();
      this.dataSource = new MatTableDataSource(searchResults.items);
    } catch(err) {
      console.log(err);
    }
  }
}
