import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHelpComponent } from './app-help.component';

describe('AppHelpComponent', () => {
  let component: AppHelpComponent;
  let fixture: ComponentFixture<AppHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppHelpComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
