import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoArtworkComponent } from './info-artwork.component';

describe('InfoArtworkComponent', () => {
  let component: InfoArtworkComponent;
  let fixture: ComponentFixture<InfoArtworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoArtworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
