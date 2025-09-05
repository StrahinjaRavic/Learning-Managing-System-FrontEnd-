import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacijaZadaciComponentComponent } from './evaluacija-zadaci-component.component';

describe('EvaluacijaZadaciComponentComponent', () => {
  let component: EvaluacijaZadaciComponentComponent;
  let fixture: ComponentFixture<EvaluacijaZadaciComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacijaZadaciComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacijaZadaciComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
