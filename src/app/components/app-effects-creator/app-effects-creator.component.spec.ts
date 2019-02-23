import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEffectsCreatorComponent } from './app-effects-creator.component';
import { AppModule } from 'src/app/app.module';

describe('AppEffectsCreatorComponent', () => {
  let component: AppEffectsCreatorComponent;
  let fixture: ComponentFixture<AppEffectsCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEffectsCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
