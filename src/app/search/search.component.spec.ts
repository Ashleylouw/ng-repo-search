import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RepoService } from '../shared/services/repo.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../shared/components/table/table.component';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, TableComponent ],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatInputModule,
        MatDialogModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatTableModule,
        ReactiveFormsModule
      ],
      providers: [
        RepoService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a heading', () => {
    const heading: HTMLHeadElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(heading.textContent).toEqual('Search gihub for a repository:');
  });

  describe('search', () => {
    beforeEach(() => {
      spyOn(RepoService.prototype, 'getRepo').and.returnValue(of([
        {
          id: 651094,
          full_name: 'boo-lang/boo'
        },
        {
          id: 13491895,
          full_name: 'oneops/boo'
        }
      ]))
    })
    it('should have an empty search input field', () => {
      const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(input.value).toEqual('');
    })
    it('should have a search button', () => {
      const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(button.textContent).toEqual('Search');
    });
    it('should enable search button and start search if button is clicked and there is an input value', () => {
      component.searchForm.controls.searchTerm.setValue('bootstrap');
      fixture.detectChanges();
      const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      expect(button.disabled).toEqual(false);
      button.click();
      fixture.detectChanges();
      const appTable = fixture.debugElement.query(By.css('.table-wrapper'));
      expect(appTable).not.toBeNull();
    })

    describe('onInit', () => {
      it('should get value from localstorage and run search', () => {
        localStorage.setItem('searchTerm', 'bootstrap');
        fixture.detectChanges();
        const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(input.value).toEqual('bootstrap');
        const appTable = fixture.debugElement.query(By.css('.table-wrapper'));
        expect(appTable).not.toBeNull();
      });
      it('should NOT get value from localstorage and not run search', () => {
        localStorage.clear();
        fixture.detectChanges();
        const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(input.value).toEqual('');
        const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
        expect(button.disabled).toEqual(true);
        const appTable = fixture.debugElement.query(By.css('.table-wrapper'));
        expect(appTable).toBeNull();
      })
    })
  })
});
