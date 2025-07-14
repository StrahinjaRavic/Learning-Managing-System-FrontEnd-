import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPretragaComponent } from './student-pretraga.component';

describe('StudentPretragaComponent', () => {
  let component: StudentPretragaComponent;
  let fixture: ComponentFixture<StudentPretragaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPretragaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPretragaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
