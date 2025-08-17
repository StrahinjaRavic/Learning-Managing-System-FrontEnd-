import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KancelarijskiMaterijalComponent } from './kancelarijski-materijal.component';

describe('KancelarijskiMaterijalComponent', () => {
  let component: KancelarijskiMaterijalComponent;
  let fixture: ComponentFixture<KancelarijskiMaterijalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KancelarijskiMaterijalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KancelarijskiMaterijalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
