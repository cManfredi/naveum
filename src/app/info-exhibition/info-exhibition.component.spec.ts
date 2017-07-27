import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoExhibitionComponent } from './info-exhibition.component';

describe('InfoExhibitionComponent', () => {
  let component: InfoExhibitionComponent;
  let fixture: ComponentFixture<InfoExhibitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoExhibitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoExhibitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
