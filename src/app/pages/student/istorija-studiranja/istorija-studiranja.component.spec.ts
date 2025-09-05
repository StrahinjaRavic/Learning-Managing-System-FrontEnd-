import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstorijaStudiranjaComponent } from './istorija-studiranja.component';

describe('IstorijaStudiranjaComponent', () => {
  let component: IstorijaStudiranjaComponent;
  let fixture: ComponentFixture<IstorijaStudiranjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IstorijaStudiranjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstorijaStudiranjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
