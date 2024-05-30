import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignementOngletComponent } from './assignement-onglet.component';

describe('AssignementOngletComponent', () => {
  let component: AssignementOngletComponent;
  let fixture: ComponentFixture<AssignementOngletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignementOngletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignementOngletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
