import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutComponent } from './app-layout.component';
import { AppModule } from 'src/app/app.module';
import { AudioContext } from 'web-audio-test-api';

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
    // jsdom doesnt implement AudioContext
    window['AudioContext'] = AudioContext;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.debugElement.nativeElement;
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
});
