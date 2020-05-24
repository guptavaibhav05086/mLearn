import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsingupComponent } from './studentsingup.component';

describe('StudentsingupComponent', () => {
  let component: StudentsingupComponent;
  let fixture: ComponentFixture<StudentsingupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsingupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
