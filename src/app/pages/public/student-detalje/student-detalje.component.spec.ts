import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetaljeComponent } from './student-detalje.component';

describe('StudentDetaljeComponent', () => {
  let component: StudentDetaljeComponent;
  let fixture: ComponentFixture<StudentDetaljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDetaljeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetaljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
