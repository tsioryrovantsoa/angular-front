import { Component, Inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, RouterLink,MatDividerModule, MatDialogModule,MatFormFieldModule,
    MatButtonModule, MatCardModule, MatCheckboxModule,FormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent {
  note: number | null = null;
  remarque: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<NoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit() {
    this.dialogRef.close({ note: this.note, remarque: this.remarque });
  }
}
