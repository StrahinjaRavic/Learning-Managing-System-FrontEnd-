import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnesiOcenuComponent } from './unesi-ocenu.component';

describe('UnesiOcenuComponent', () => {
  let component: UnesiOcenuComponent;
  let fixture: ComponentFixture<UnesiOcenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnesiOcenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnesiOcenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
