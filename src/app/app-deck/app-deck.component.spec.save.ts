import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeckComponent } from './app-deck.component';

describe('AppDeckComponent', () => {
  let component: AppDeckComponent;
  let fixture: ComponentFixture<AppDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppDeckComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
