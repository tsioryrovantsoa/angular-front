import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatierecardComponent } from './matierecard.component';

describe('MatierecardComponent', () => {
  let component: MatierecardComponent;
  let fixture: ComponentFixture<MatierecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatierecardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatierecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
