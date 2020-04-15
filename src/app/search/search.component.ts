import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RepoService } from '../shared/services/repo.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface RepoData {
  full_name: string;
  description: string;
  actions: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  /**
   * Form group and form control for input.
   */
  searchForm = new FormGroup({
    searchTerm: new FormControl('')
  });

  @Output()
  selectedItem: EventEmitter<string> = new EventEmitter();

  /**
   * Search button clicked flag.
   *
   * @type { boolean }
   */
  searchClicked: boolean = false;

  /**
   * Columns to display in table compopnent.
   *
   * @type { string[] }
   */
  displayedColumns: string[] = ['select', 'id','full_name', 'actions'];

  /**
   * Data source for the table component.
   *
   * @type { MatTableDataSource<RepoIssues> }
   */
  dataSource: MatTableDataSource<RepoData>;

  /**
   * Constructor.
   *
   * @param { RepoService } repoService 
   */
  constructor(private repoService: RepoService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.searchClicked = false;
    if (localStorage.getItem('searchTerm')) {
      this.searchForm.controls.searchTerm.setValue(localStorage.getItem('searchTerm'));
      this.startSearch();
    }
  }

  /**
    * Gets the data that needs to be set on table component.
    *
    * @returns { Promise<void> }
    */
  async startSearch(): Promise<void> {
    this.searchClicked = true;
    localStorage.setItem('searchTerm', this.searchForm.controls.searchTerm.value);
    try {
      let searchResults = await this.repoService.getRepo(this.searchForm.controls.searchTerm.value).toPromise();
      this.dataSource = new MatTableDataSource(searchResults.items);
    } catch(err) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        duration: 5000,
        data: {
          error: err.statusText,
          message: err.message
        }
      });
    }
  }
}
