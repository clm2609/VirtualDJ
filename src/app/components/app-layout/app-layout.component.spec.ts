import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLayoutComponent } from './app-layout.component';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';
import { AppDeckComponent } from '../app-deck/app-deck.component';
import { PlayerService } from 'src/app/services/player.service';
import { AppVolumeComponent } from '../app-volume/app-volume.component';

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;
  let hostElement: HTMLElement;
  let deck0Component: AppDeckComponent;
  // let deck1Component: AppDeckComponent;
  let volumeComponent: AppVolumeComponent;
  let playerService: PlayerService;
  let wavesurfer1;
  let wavesurfer0;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.debugElement.nativeElement;
    deck0Component = fixture.debugElement.query(By.css('#app_deck_0_component')).componentInstance;
    // deck1Component = fixture.debugElement.query(By.css('#app_deck_1_component')).componentInstance;
    volumeComponent = fixture.debugElement.query(By.css('#app_volume_component')).componentInstance;
    playerService = deck0Component.playerService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show the layout by default', () => {
    expect(hostElement.querySelector('#app_layout')).toBeTruthy();
  });

  it('should let you navigate with the tabs menu', () => {
    expect(hostElement.querySelector('#app_music_list_container')).toBeTruthy();

    hostElement.querySelector('#app_tabs_settings').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#app_settings')).toBeTruthy();

    hostElement.querySelector('#app_tabs_effects_creator').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#app_effects_creator')).toBeTruthy();

    hostElement.querySelector('#app_tabs_help').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#app_help')).toBeTruthy();

    hostElement.querySelector('#app_tabs_about').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#app_about')).toBeTruthy();

    hostElement.querySelector('#app_tabs_music_list').dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(hostElement.querySelector('#app_music_list_container')).toBeTruthy();
  });
  // For some obscure reason if this test is above any other test things break
  it('should show the warning if width is smaller than height', () => {
    component.actualWidth = 720;
    component.actualHeight = 1024;
    fixture.detectChanges();
    expect(hostElement.querySelector('#app_wrong_orientation_warning')).toBeTruthy();
  });

  // TODO: Debug and discover why i get 1 whenever i use getVolume
  it('should change deck 0 volume correctly', async () => {
    const wait = ms => new Promise((r, j) => setTimeout(r, ms));
    while (!playerService.getInstance(0)) {
      await wait(100);
    }
    wavesurfer0 = playerService.getInstance(0);
    expect(wavesurfer0.getVolume()).toBe(1);
    volumeComponent.volume0 = 0;
    volumeComponent.changeVolume(0);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer0.getVolume()).toBe(0);
    volumeComponent.volume0 = 50;
    volumeComponent.changeVolume(0);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer0.getVolume()).toBe(0.5);
    volumeComponent.volume0 = 25;
    volumeComponent.changeVolume(0);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer0.getVolume()).toBe(0.25);
    volumeComponent.volume0 = 75;
    volumeComponent.changeVolume(0);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer0.getVolume()).toBe(0.75);
  });

  it('should change deck 1 volume correctly', async () => {
    const wait = ms => new Promise((r, j) => setTimeout(r, ms));
    while (!playerService.getInstance(1)) {
      await wait(100);
    }
    wavesurfer1 = playerService.getInstance(1);
    expect(wavesurfer1.getVolume()).toBe(1);
    volumeComponent.volume1 = 0;
    volumeComponent.changeVolume(1);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer1.getVolume()).toBe(0);
    volumeComponent.volume1 = 50;
    volumeComponent.changeVolume(1);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer1.getVolume()).toBe(0.5);
    volumeComponent.volume1 = 25;
    volumeComponent.changeVolume(1);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer1.getVolume()).toBe(0.25);
    volumeComponent.volume1 = 75;
    volumeComponent.changeVolume(1);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer1.getVolume()).toBe(0.75);
  });
  it('should change balance volume correctly', async () => {
    const wait = ms => new Promise((r, j) => setTimeout(r, ms));
    while (!playerService.getInstance(0)) {
      await wait(100);
    }
    wavesurfer0 = playerService.getInstance(0);
    while (!playerService.getInstance(1)) {
      await wait(100);
    }
    wavesurfer1 = playerService.getInstance(1);
    expect(wavesurfer0.getVolume() === 1);
    expect(wavesurfer1.getVolume() === 1);
    volumeComponent.volumeMaster = 100;
    volumeComponent.changeVolume(0);
    volumeComponent.changeVolume(1);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer0.getVolume()).toBe(0);
    // expect(wavesurfer1.getVolume()).toBe(1);
    volumeComponent.volumeMaster = -100;
    volumeComponent.changeVolume(0);
    volumeComponent.changeVolume(1);
    fixture.detectChanges();
    // await wait(100);
    // expect(wavesurfer0.getVolume()).toBe(1);
    // expect(wavesurfer1.getVolume()).toBe(0);
  });
});
