import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMusicListComponent } from './app-music-list.component';
import { AppModule } from 'src/app/app.module';

describe('AppMusicListComponent', () => {
  let component: AppMusicListComponent;
  let fixture: ComponentFixture<AppMusicListComponent>;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMusicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostElement = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show start instructions by default', () => {
    expect(component.musicList.length === 0).toBeTruthy();
    expect(hostElement.querySelector('#app_start_instructions')).toBeTruthy();
  });
  it('should show music list if a song is loaded', () => {
    component.musicList.push({ name: 'mock song' } as File);
    expect(component.musicList.length === 1).toBeTruthy();
    fixture.detectChanges();
    expect(hostElement.querySelector('#app_music_list')).toBeTruthy();
  });
});
