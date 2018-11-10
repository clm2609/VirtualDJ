import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMusicListComponent } from './app-music-list.component';

describe('AppMusicListComponent', () => {
  let component: AppMusicListComponent;
  let fixture: ComponentFixture<AppMusicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppMusicListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMusicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
