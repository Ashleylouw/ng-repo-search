import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CardComponent } from './card/card.component';
import { IssuesComponent } from './issues/issues.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: CardComponent },
  { path: 'search', component: SearchComponent },
  { path: 'issues', component: IssuesComponent },
  { path: 'stats', component: StatsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
