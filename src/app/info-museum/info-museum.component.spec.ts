import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMuseumComponent } from './info-museum.component';

describe('InfoMuseumComponent', () => {
  let component: InfoMuseumComponent;
  let fixture: ComponentFixture<InfoMuseumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMuseumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMuseumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
