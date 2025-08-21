import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajPolaganjaComponent } from './izvestaj-polaganja.component';

describe('IzvestajPolaganjaComponent', () => {
  let component: IzvestajPolaganjaComponent;
  let fixture: ComponentFixture<IzvestajPolaganjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IzvestajPolaganjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzvestajPolaganjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
