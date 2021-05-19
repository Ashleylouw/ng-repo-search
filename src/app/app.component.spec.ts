import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a toolbar with title and menu button to open sidenav', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar')).nativeElement;
    expect(toolbar.nodeName).toEqual('MAT-TOOLBAR');
    expect(toolbar.childNodes[0].nodeName).toEqual('BUTTON');
    expect(toolbar.childNodes[1].textContent).toEqual('Repository Search');
  });

  it('should open sidenav with toolbar menu button and display 3 buttons', () => {
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    const listItems: DebugElement[] = fixture.debugElement.queryAll(By.css('a'));
    expect(listItems[0].nativeElement.textContent).toEqual('search');
    expect(listItems[1].nativeElement.textContent).toEqual('bug_report');
    expect(listItems[2].nativeElement.textContent).toEqual('bar_chart');
  })
});
