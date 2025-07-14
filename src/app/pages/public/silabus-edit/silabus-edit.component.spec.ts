import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilabusEditComponent } from './silabus-edit.component';

describe('SilabusEditComponent', () => {
  let component: SilabusEditComponent;
  let fixture: ComponentFixture<SilabusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilabusEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilabusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
