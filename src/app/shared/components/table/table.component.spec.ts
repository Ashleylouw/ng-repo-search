import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RepoData } from '../../../search/search.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SimpleChange, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const repoSearchData: RepoData[] = [
    {
      id: 651094,
      full_name: 'boo-lang/boo',
      actions: ''
    },
    {
      id: 13491895,
      full_name: 'twbs/bootstrap',
      actions: ''
    },
    {
      id: 14491989,
      full_name: 'oneops/boo',
      actions: ''
    },
    {
      id: 16591995,
      full_name: 'boo/long',
      actions: ''
    },
    {
      id: 75000,
      full_name: 'boo/boo',
      actions: ''
    }
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatDialogModule,
        MatInputModule,
        MatProgressBarModule,
        MatPaginatorModule,
        MatCheckboxModule
      ],
      declarations: [ TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.tableColumns = [];
    component.tableData = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render table and continue running spinner component', () => {
    fixture.detectChanges();
    const progressBar = fixture.debugElement.query(By.css('mat-progress-bar')).nativeElement;
    const table = fixture.debugElement.query(By.css('table'));
    expect(progressBar).not.toBeNull();
    expect(table).toBeNull();
  })

  describe('render table based of repo search input', () => {
    beforeEach(() => {
      component.tableColumns = ['select', 'id','full_name', 'actions'];
      component.tableData = repoSearchData;
      component.ngOnChanges({
        tableData: new SimpleChange(null, component.tableData, false)
      })
      fixture.detectChanges();
    })
    it('should render columns based of table columns that were received as input', () => {
      const table: HTMLTableElement = fixture.debugElement.query(By.css('table')).nativeElement;
      expect(table.tHead.rows[0].cells.length).toEqual(4);
      expect(table.tHead.rows[0].cells[0].childNodes[0].nodeName).toEqual('MAT-CHECKBOX');
      expect(table.tHead.rows[0].cells[1].textContent).toEqual(' id ');
      expect(table.tHead.rows[0].cells[2].textContent).toEqual(' full_name ');
      expect(table.tHead.rows[0].cells[3].textContent).toEqual(' actions ');
    })
    it('should render a body with 4 columns and 5 rows', () => {
      const table: HTMLTableElement = fixture.debugElement.query(By.css('table')).nativeElement;
      expect(table.tHead.rows[0].cells.length).toEqual(4);
      expect(table.tBodies[0].rows.length).toEqual(5);
    })
    it('should filter the table when you enter something in the filter box', () => {
      const event = new KeyboardEvent('keyup', {
        bubbles : true, cancelable : true, shiftKey : false
      });
      const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      input.value = 'long';
      input.dispatchEvent(event);
      fixture.detectChanges();
      const table: HTMLTableElement = fixture.debugElement.query(By.css('table')).nativeElement;
      expect(table.tBodies[0].rows.length).toEqual(1);
    })
    it('should select a row and should show two icons under actions in selected row', () => {
      const checkbox = fixture.debugElement.queryAll(By.css('.mat-checkbox-input'));
      checkbox[2].nativeElement.click()
      fixture.detectChanges();
      const table: HTMLTableElement = fixture.debugElement.query(By.css('table')).nativeElement;
      expect(table.tBodies[0].rows[1].cells[3].childNodes[1].childNodes[0].nodeName).toEqual('BUTTON');
      expect(table.tBodies[0].rows[1].cells[3].childNodes[1].childNodes[0].textContent).toEqual('description');
      expect(table.tBodies[0].rows[1].cells[3].childNodes[1].childNodes[1].nodeName).toEqual('A');
      expect(table.tBodies[0].rows[1].cells[3].childNodes[1].childNodes[1].textContent).toEqual('call_made');
    })
    it('should open dialog from selected row', () => {
      let dialogSpy = spyOn(component.dialog, 'open');
      const checkbox = fixture.debugElement.queryAll(By.css('.mat-checkbox-input'));
      checkbox[2].nativeElement.click()
      fixture.detectChanges();
      const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
      button.click();
      fixture.detectChanges();
      expect(dialogSpy).toHaveBeenCalled()
    })
  })
});
