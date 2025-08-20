import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdzbenikComponent } from './udzbenik.component';

describe('UdzbeniComponent', () => {
  let component: UdzbenikComponent;
  let fixture: ComponentFixture<UdzbenikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UdzbenikComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdzbenikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
