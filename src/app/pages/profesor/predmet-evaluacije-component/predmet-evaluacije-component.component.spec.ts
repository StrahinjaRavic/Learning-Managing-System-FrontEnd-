import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetEvaluacijeComponentComponent } from './predmet-evaluacije-component.component';

describe('PredmetEvaluacijeComponentComponent', () => {
  let component: PredmetEvaluacijeComponentComponent;
  let fixture: ComponentFixture<PredmetEvaluacijeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredmetEvaluacijeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredmetEvaluacijeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
