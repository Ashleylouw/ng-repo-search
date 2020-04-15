import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RepoService } from './shared/services/repo.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { DetailsComponent } from './details/details.component';
import { TableComponent } from './shared/components/table/table.component';
import { IssuesComponent } from './issues/issues.component';
import { StatsComponent } from './stats/stats.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    SearchComponent,
    TableComponent,
    IssuesComponent,
    StatsComponent,
    SnackbarComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [RepoService, SnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
