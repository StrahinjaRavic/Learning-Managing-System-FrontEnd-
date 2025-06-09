import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmerDetaljiComponent } from './smer-detalji.component';

describe('SmerDetaljiComponent', () => {
  let component: SmerDetaljiComponent;
  let fixture: ComponentFixture<SmerDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmerDetaljiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmerDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
