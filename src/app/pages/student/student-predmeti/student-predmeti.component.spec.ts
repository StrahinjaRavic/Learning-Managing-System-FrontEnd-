import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPredmetiComponent } from './student-predmeti.component';

describe('StudentPredmetiComponent', () => {
  let component: StudentPredmetiComponent;
  let fixture: ComponentFixture<StudentPredmetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPredmetiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPredmetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
