import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepoService } from '../repo.service';
import { FormControl, FormGroup } from '@angular/forms';

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
export class SearchComponent {

  searchForm = new FormGroup({
    searchTerm: new FormControl('')
  });

  /**
   * Columns to display in table compopnent.
   *
   * @type { string[] }
   */
  displayedColumns: string[] = ['full_name', 'description', 'actions'];
  dataSource: MatTableDataSource<RepoData>;

  constructor(private repoService: RepoService) { }


  async startSearch(): Promise<void> {
    try {
      let searchResults = await this.repoService.getRepo(this.searchForm.controls.searchTerm.value).toPromise();
      this.dataSource = new MatTableDataSource(searchResults.items);
    } catch(err) {
      console.log(err);
    }
  }
}
