import { Component, Inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, RouterLink,MatDividerModule,MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent {
  note: number | null = null;
  remarque: string | null = null;
  assignmentTransmis!: Assignment|any;

  onSubmit(): void {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentTransmis.note = this.note;
      this.assignmentTransmis.remarque = this.remarque;
      this.assignmentsService.noteAssignment(this.assignmentTransmis).subscribe((message) => {
        this.dialogRef.close({ note: this.note, remarque: this.remarque });
      });
    } else {
      this.dialogRef.close();
    }
  }

  ngOnInit() {

    this.assignmentTransmis=this.data.assignmentTransmis
    console.log("coucou"+this.assignmentTransmis.nom)
  }

  constructor(private assignmentsService:AssignmentsService,
    public dialogRef: MatDialogRef<NoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private route:ActivatedRoute,
    private router:Router,
  ) {}

  onNoClick(): void {
    // this.dialogRef.close();
    console.log("tay")
  }
}
