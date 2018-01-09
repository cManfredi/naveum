import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverButtonComponent } from './over-button.component';

describe('OverButtonComponent', () => {
  let component: OverButtonComponent;
  let fixture: ComponentFixture<OverButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
