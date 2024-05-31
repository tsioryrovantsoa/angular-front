import { Component } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { MatDialog } from '@angular/material/dialog';
import { NoteFormComponent } from '../assignments/note-form/note-form.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignement-onglet',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './assignement-onglet.component.html',
  styleUrl: './assignement-onglet.component.css',
})
export class AssignementOngletComponent {
  nonRenduAssignments: Assignment[] = [];
  renduAssignments: Assignment[] = [];
  isAdmin = () => true; // Assurez-vous de remplacer cela par votre logique d'authentification réelle

  constructor(
    private assignmentService: AssignmentsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    // Appel API pour les assignments rendus
    this.assignmentService.getAssignmentsWithLimit(true).subscribe((data) => {
      this.snackBar.open(`${data.message} ✔️`, 'Fermer', {
        duration: 3000
      });
      console.log(data); // Affichez les assignments pour le débogage
      this.renduAssignments = data.data;
    });

    // Appel API pour les assignments non rendus
    this.assignmentService.getAssignmentsWithLimit(false).subscribe((data) => {
      this.snackBar.open(`${data.message} ✔️`, 'Fermer', {
        duration: 3000
      });
      console.log(data); // Affichez les assignments pour le débogage
      this.nonRenduAssignments = data.data;
    });
  }

  openDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(NoteFormComponent, {
      data: { assignmentTransmis: assignment },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.snackBar.open(`${result} ✔️`, 'Fermer', {
        duration: 3000
      });
      this.loadAssignments();
    });
  }
}
