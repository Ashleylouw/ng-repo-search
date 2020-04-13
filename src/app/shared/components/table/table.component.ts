import { Component, OnChanges, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RepoData } from '../../../search/search.component';
import { RepoIssues } from '../../../issues/issues.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {
  /**
   * Keeps track of the mat-table data loaded state.
   *
   * @type { boolean }
   */
  loaded: boolean = false;

  /**
   * The mat-table columns.
   *
   * @type { string[] }
   */
  displayedColumns: string[];

  /**
   * The mat-table data source.
   *
   * @type { MatTableDataSource<RepoData | RepoIssues> }
   */
  dataSource: MatTableDataSource<RepoData | RepoIssues>;

  /**
   * The mat-table paginator.
   *
   * @type { MatPaginator }
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * The mat-table sort.
   *
   * @type { MatSort }
   */
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  /**
   * Input receives the columns to diplay.
   *
   * @type { string[] }
   */
  @Input()
  private tableColumns: string[];

  /**
   * Input receives the data source for mat-table.
   *
   * @type { any }
   */
  @Input()
  private tableData: any;

  /**
   * OnChanges hook that sets the mat-table source and column data.
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tableData.currentValue !== changes.tableData.previousValue) {
      this.displayedColumns = this.tableColumns;
      this.dataSource = new MatTableDataSource(changes.tableData.currentValue.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loaded = true;
    }
  }

  /**
   * Filters the mat-table data.
   *
   * @param { Event } event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
