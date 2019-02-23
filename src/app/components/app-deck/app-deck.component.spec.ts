import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeckComponent } from './app-deck.component';
import { AppModule } from 'src/app/app.module';
import { PlayerService } from 'src/app/services/player.service';

describe('AppDeckComponent', () => {
  let component: AppDeckComponent;
  let fixture: ComponentFixture<AppDeckComponent>;
  const deckNumber = 0;
  let hostElement: HTMLElement;
  let wavesurfer;
  let playerService: PlayerService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDeckComponent);
    component = fixture.componentInstance;
    component.deckNumber = deckNumber;
    fixture.detectChanges();
    hostElement = fixture.debugElement.nativeElement;
    playerService = component.playerService;
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

  it('should load a song correctly', async () => {
    const wait = ms => new Promise((r, j) => setTimeout(r, ms));
    while (!playerService.getInstance(0)) {
      await wait(100);
    }
    wavesurfer = playerService.getInstance(0);
    wavesurfer.load('assets/testing/testSong1.mp3');
    while (!wavesurfer.getDuration()) {
      await wait(100);
    }
    expect(wavesurfer.getDuration() === 209.6587755102041).toBeTruthy();
  });
  it('should let you play a song', async () => {
    const wait = ms => new Promise((r, j) => setTimeout(r, ms));
    while (!playerService.getInstance(0)) {
      await wait(100);
    }
    wavesurfer = playerService.getInstance(0);
    wavesurfer.load('assets/testing/testSong1.mp3');
    while (!wavesurfer.getDuration()) {
      await wait(100);
    }
    expect(wavesurfer.isPlaying()).toBeFalsy();
    hostElement.querySelector('#app_deck_0_play_button').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(wavesurfer.isPlaying()).toBeTruthy();
    hostElement.querySelector('#app_deck_0_play_button').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(wavesurfer.isPlaying()).toBeFalsy();
  });
});
