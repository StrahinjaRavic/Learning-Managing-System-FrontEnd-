import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentiNaPredmetuComponent } from './studenti-na-predmetu.component';

describe('StudentiNaPredmetuComponent', () => {
  let component: StudentiNaPredmetuComponent;
  let fixture: ComponentFixture<StudentiNaPredmetuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentiNaPredmetuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentiNaPredmetuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
