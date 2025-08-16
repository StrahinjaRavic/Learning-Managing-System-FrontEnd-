import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacijaResultsComponent } from './prijava-results.component';

describe('EvaluacijaResultsComponent', () => {
  let component: EvaluacijaResultsComponent;
  let fixture: ComponentFixture<EvaluacijaResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacijaResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacijaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
