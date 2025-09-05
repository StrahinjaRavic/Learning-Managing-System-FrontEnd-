import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaPolaganjaComponent } from './prijava-polaganja.component';

describe('PrijavaPolaganjaComponent', () => {
  let component: PrijavaPolaganjaComponent;
  let fixture: ComponentFixture<PrijavaPolaganjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrijavaPolaganjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrijavaPolaganjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
