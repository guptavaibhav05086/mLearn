import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersingupComponent } from './trainersingup.component';

describe('TrainersingupComponent', () => {
  let component: TrainersingupComponent;
  let fixture: ComponentFixture<TrainersingupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainersingupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
