import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './details.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {selectedPortal: {}} },
      ],
      declarations: [ DetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.data = {
      full_name: 'test',
      description: 'This is just a dummy description',
      created_at: '2010-05-06T19:45:31Z',
      stargazers_count: 22,
      forks: 400,
      watchers: 500,
      open_issues: 10
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get repo name on Init', () => {
      const heading: HTMLHeadElement = fixture.debugElement.query(By.css('h3')).nativeElement;
      const span: DebugElement[] = fixture.debugElement.queryAll(By.css('span'));
      expect(heading.textContent).toEqual('Selected Repository test details:');
      expect(span[0].nativeElement.textContent).toEqual('test');
  });
  describe('repository details', () => {
    it('should have a description', () => {
      const span: DebugElement[] = fixture.debugElement.queryAll(By.css('span'));
      expect(span[1].nativeElement.textContent).toEqual('This is just a dummy description');
    });
    it('should have a created at date', () => {
      const span: DebugElement[] = fixture.debugElement.queryAll(By.css('span'));
      expect(span[2].nativeElement.textContent).toEqual('May 6, 2010');
    });
    it('should have a stargazer count', () => {
      const span: DebugElement[] = fixture.debugElement.queryAll(By.css('span'));
      expect(span[3].nativeElement.textContent).toEqual('22');
    })
    it('should show the amount of forks', () => {
      const span: DebugElement[] = fixture.debugElement.queryAll(By.css('span'));
      expect(span[4].nativeElement.textContent).toEqual('400');
    });
    it('should show the amount of watchers', () => {
      const span: DebugElement[] = fixture.debugElement.queryAll(By.css('span'));
      expect(span[5].nativeElement.textContent).toEqual('500');
    });
    it('should show the amount of open issues', () => {
      const span: DebugElement[] = fixture.debugElement.queryAll(By.css('span'));
      expect(span[6].nativeElement.textContent).toEqual('10');
    })
  });
  it('should have a close button that when clicked will close all the dialogs(there is only one)', () => {
    let dialogRefSpy = spyOn(component.dialogRef, 'closeAll');
    const closeButton: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(closeButton.textContent).toEqual('Close');
    closeButton.click();
    fixture.detectChanges();
    expect(dialogRefSpy).toHaveBeenCalled();
  })
});
