import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsComponent } from './stats.component';
import { By } from '@angular/platform-browser';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('when items exist in localstorage', () => {
    beforeEach(() => {
      localStorage.setItem('selectedRow', JSON.stringify({data:{full_name: 'test'}}));
      localStorage.setItem('openIssues', JSON.stringify(60));
      localStorage.setItem('closedIssues', JSON.stringify(40));
    })
    it('should get repo name on Init', () => {
      fixture.detectChanges();
      const heading: HTMLHeadElement = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(heading.textContent).toEqual('Stats for the top 100 issues in the repository test');
      expect(heading.childNodes[1].textContent).toEqual('test');
    });
    it('should render chart', () => {
      fixture.detectChanges();
      const chart = fixture.debugElement.query(By.css('.chart'));
      expect(chart).not.toBeNull();
    })
  })

  xdescribe('when items do NOT exist in localstorage', () => {
    beforeEach(() => {
      localStorage.clear();
    })
    it('should NOT get repo name on Init', () => {
      fixture.detectChanges();
      const heading: HTMLHeadElement = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(heading.textContent).toEqual('Stats for the top 100 issues in the repository ');
      expect(heading.childNodes[1].textContent).toEqual('');
    });
    it('should show no data screen', () => {
      fixture.detectChanges();
      const noDataScreen: HTMLDivElement = fixture.debugElement.query(By.css('.no-data')).nativeElement;
      expect(noDataScreen.childNodes[0].textContent).toEqual('warning');
      expect(noDataScreen.childNodes[1].textContent).toEqual('Please search and select a repository to view details for.');
    })
    it('should NOT render chart', () => {
      fixture.detectChanges();
      const chart = fixture.debugElement.query(By.css('.chart'));
      expect(chart).toBeNull();
    })
  })
});
