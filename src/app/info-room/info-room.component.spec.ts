import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRoomComponent } from './info-room.component';

describe('InfoRoomComponent', () => {
  let component: InfoRoomComponent;
  let fixture: ComponentFixture<InfoRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
