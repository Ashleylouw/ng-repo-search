import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  
  /**
   * The selected repository name.
   *
   * @type { string }
   */
  repoName: string = '';

  /**
   * Constructor.
   *
   * @param { any } data
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialog) {
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
   }

   /**
    * OnInit hook that gets the data that needs to be set on table component.
    *
    * @returns { Promise<void> }
    */
   ngOnInit(): void {
    if (this.data && this.data.full_name) {
      this.repoName = this.data.full_name;
    }
  }

}
