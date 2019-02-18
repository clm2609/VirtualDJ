import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeckComponent } from './app-deck.component';
import { AppModule } from 'src/app/app.module';
import { AudioContext } from 'web-audio-test-api';

describe('AppDeckComponent', () => {
  let component: AppDeckComponent;
  let fixture: ComponentFixture<AppDeckComponent>;
  const deckNumber = 0;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
    // jsdom doesnt implement AudioContext
    window['AudioContext'] = AudioContext;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDeckComponent);
    component = fixture.componentInstance;
    component.deckNumber = deckNumber;
    fixture.detectChanges();
    hostElement = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have all effects deactivated by default', () => {
    const notActiveEffect = effect => {
      if (effect.active) {
        return true;
      } else {
        return false;
      }
    };
    expect(component.effects.every(notActiveEffect)).toBeFalsy();
  });

  it('should activate an effect if you push the effect button', () => {
    const effectToActivate = 3;
    hostElement
      .querySelector('#app_deck_' + deckNumber + '_activate_effect_' + (effectToActivate + 1))
      .dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.effects[effectToActivate].active).toBeTruthy();
  });
});
