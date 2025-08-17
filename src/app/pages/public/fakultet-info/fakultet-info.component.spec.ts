import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakultetInfoComponent } from './fakultet-info.component';

describe('FakultetInfoComponent', () => {
  let component: FakultetInfoComponent;
  let fixture: ComponentFixture<FakultetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakultetInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakultetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
