import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IssuesComponent } from './issues.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { TableComponent } from '../shared/components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepoService } from '../shared/services/repo.service';
import { of } from 'rxjs';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatIconModule,
        MatDialogModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ IssuesComponent, TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when items exist in localstorage', () => {
    beforeEach(() => {
      localStorage.setItem('selectedRow', JSON.stringify({data:{full_name: 'test'}}));
      spyOn(RepoService.prototype, 'getSelectedRepoIssues').and.returnValue(of([
        {
          number: 200,
          title: 'State of Boo',
          state: 'closed',
          created_at: '2020-02-29T17:33:59Z',
          updated_at: '2020-03-11T07:54:37Z'
        },
        {
          number: 196,
          title: 'Boo language roadmap',
          state: 'open',
          created_at: '2020-02-29T17:33:59Z',
          updated_at: '2020-03-11T07:54:37Z'
        }
      ]))
    })
    it('should get repo name on Init', () => {
      fixture.detectChanges();
      const heading: HTMLHeadElement = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(heading.textContent).toEqual('Top 100 Issues related to the selected Repository test');
      expect(heading.childNodes[1].textContent).toEqual('test');
    });
    it('should render table component', () => {
      fixture.detectChanges();
      const appTable = fixture.debugElement.query(By.css('.table-wrapper'));
      expect(appTable).not.toBeNull();
    })
  })

  describe('when items do NOT exist in localstorage', () => {
    beforeEach(() => {
      localStorage.clear();
    })
    it('should NOT get repo name on Init', () => {
      fixture.detectChanges();
      const heading: HTMLHeadElement = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(heading.textContent).toEqual('Top 100 Issues related to the selected Repository ');
      expect(heading.childNodes[1].textContent).toEqual('');
    });
    it('should show no data screen', () => {
      fixture.detectChanges();
      const noDataScreen: HTMLDivElement = fixture.debugElement.query(By.css('.no-data')).nativeElement;
      expect(noDataScreen.childNodes[0].textContent).toEqual('warning');
      expect(noDataScreen.childNodes[1].textContent).toEqual('Please search and select a repository to view details for.');
    })
    it('should NOT render table component', () => {
      fixture.detectChanges();
      const appTable = fixture.debugElement.query(By.css('.table-wrapper'));
      expect(appTable).toBeNull();
    })
  })
});
