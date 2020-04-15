import { Component, OnChanges, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RepoData } from '../../../search/search.component';
import { RepoIssues } from '../../../issues/issues.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from 'src/app/details/details.component';

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
   * The checkbox selection data.
   *
   * @type { SelectionModel<RepoData> }
   */
  selection = new SelectionModel<RepoData>(true, []);

  /**
   * Input receives true or false based on if search is clicked.
   *
   * @type { boolean }
   */
  @Input()
  searchClicked: boolean = false;

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
   * Constructor.
   *
   * @param { MatDialog } dialog 
   */
  constructor(private dialog: MatDialog) {}

  /**
   * OnChanges hook that sets the mat-table source and column data.
   *
   * @param { SimpleChanges } changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tableData && changes.tableData.currentValue !== changes.tableData.previousValue) {
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

  /** 
   * Whether the number of selected elements matches the total number of rows.
   *
   * @returns { boolean }
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** 
   * The label for the checkbox on the passed row.
   *
   * @returns { string }
   */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /**
   * Toggles selection on row change and sets repo name in localStorage for other components to use.
   *
   * @param event 
   * @param row 
   */
  onSelectedRowChange(event, row): void {
    event ? this.selection.toggle(row): null;
    localStorage.setItem('selectedRow', JSON.stringify({data: row}));
  }

  /**
   * Opens dialog component to show repo details.
   */
  openDetailsDialog(): void {
    this.dialog.open(DetailsComponent, {
      height: '500px',
      width: '600px',
      data: this.selection.selected[0]
    });
  }
}
