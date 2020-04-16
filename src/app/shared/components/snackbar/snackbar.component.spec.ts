import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarComponent } from './snackbar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      providers: [
       {provide: MAT_SNACK_BAR_DATA,useValue: {}} 
      ],
      declarations: [ SnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    component.data = {error: 'test', message: 'Unknown error something broke. Whoops!'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an icon that says error and a title', () => {
    const title: HTMLDivElement = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(title.childNodes[0].textContent).toEqual('error');
    expect(title.childNodes[1].textContent).toEqual('TEST');
  });

  it('should have a message', () => {
    const title: HTMLDivElement = fixture.debugElement.query(By.css('.body')).nativeElement;
    expect(title.childNodes[0].textContent).toEqual('Unknown error something broke. Whoops!');
  })
});
