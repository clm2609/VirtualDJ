import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTabsComponent } from './app-tabs.component';

describe('AppTabsComponent', () => {
  let component: AppTabsComponent;
  let fixture: ComponentFixture<AppTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppTabsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
