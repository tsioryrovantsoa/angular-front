import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignementDragAndDropComponent } from './assignement-drag-and-drop.component';

describe('AssignementDragAndDropComponent', () => {
  let component: AssignementDragAndDropComponent;
  let fixture: ComponentFixture<AssignementDragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignementDragAndDropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignementDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
