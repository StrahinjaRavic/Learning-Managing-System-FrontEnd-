import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminComponent } from './termin.component';

describe('TerminComponent', () => {
  let component: TerminComponent;
  let fixture: ComponentFixture<TerminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
