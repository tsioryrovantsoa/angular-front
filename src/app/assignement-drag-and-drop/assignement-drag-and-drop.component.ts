import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { MatDialog } from '@angular/material/dialog';
import { NoteFormComponent } from '../assignments/note-form/note-form.component';

@Component({
  selector: 'app-assignement-drag-and-drop',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    DragDropModule
  ],
  templateUrl: './assignement-drag-and-drop.component.html',
  styleUrl: './assignement-drag-and-drop.component.css'
})
export class AssignementDragAndDropComponent {
  nonRenduAssignments: Assignment[] = [];
  renduAssignments: Assignment[] = [];
  isAdmin = () => true; // Assurez-vous de remplacer cela par votre logique d'authentification réelle

  constructor(
    private assignmentService: AssignmentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.assignmentService.getAssignmentsWithLimit(false).subscribe((data) => {
      this.nonRenduAssignments = data.data;
    });

    this.assignmentService.getAssignmentsWithLimit(true).subscribe((data) => {
      this.renduAssignments = data.data;
    });
  }

  openDialog(assignment: Assignment, event: CdkDragDrop<Assignment[]>): void {
    const dialogRef = this.dialog.open(NoteFormComponent, {
      data: { assignmentTransmis: assignment },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAssignments();
      console.log("Appel de load Assignement");
    });
  }

  drop(event: CdkDragDrop<Assignment[]>): void {
    console.log(event.item.data);
    // if (event.previousContainer === event.container) {
    //   return; // Pas de mouvement entre conteneurs
    // }
    const assignment: Assignment = event.item.data;
    if (!assignment.rendu) {
      this.openDialog(assignment, event);
    }
  }
}
