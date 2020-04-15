import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  template: `
    <div class="snackbar-container">
      <div class="title">
        <mat-icon aria-hidden="false" aria-label="no data warning">error</mat-icon>
        <span>{{data.error.toUpperCase()}}</span>
      </div>
      <div class="body">
        <span>{{data.message}}</span>
      </div>
    </div>
  `,
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  /**
   * This is the status text that is received from catch block.
   */
  error: string;

  /**
   * This is the message that is received from catch block.
   */
  message: string;

  /**
   * Constructor
   *
   * @param { {error: string, message: string} } data
   */
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {error: string, message: string}) { }
}
