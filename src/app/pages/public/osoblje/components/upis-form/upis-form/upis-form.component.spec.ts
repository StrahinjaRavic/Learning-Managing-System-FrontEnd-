import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpisFormComponent } from './upis-form.component';

describe('UpisFormComponent', () => {
  let component: UpisFormComponent;
  let fixture: ComponentFixture<UpisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpisFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
