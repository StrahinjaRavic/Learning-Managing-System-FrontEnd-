import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikPredmetiComponent } from './nastavnik-predmeti.component';

describe('NastavnikPredmetiComponent', () => {
  let component: NastavnikPredmetiComponent;
  let fixture: ComponentFixture<NastavnikPredmetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NastavnikPredmetiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NastavnikPredmetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
