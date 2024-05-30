import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfService } from '../../prof/prof.service';
import { MatiereService } from '../../shared/matiere.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit {
  assignmentData: any = {
    nom: '',
    dateDeRendu: new Date(),
    rendu: false,
    renduauteur: false,
    matiere: '',
    auteur: '',
    note: null,
    remarques: null,
  };
  subjects: any[] = [];
  auteurs: any[] = [];
  showProfessor = true;
  selectedProfessor: string = '';

  constructor(
    private assignmentService: AssignmentsService,
    private profService: ProfService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // on récupère l'id dans l'url
    const id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.loadAssignment(id);
    }
    this.loadInitialData();
  }

  loadAssignment(id: string): void {
    this.assignmentService
      .getAssignment(id)
      .subscribe((data) => {
        this.assignmentData = data.data;
        console.log(data.data);
      });
  }

  loadInitialData(): void {
    this.profService
      .getAllMatiere()
      .subscribe((data) => (this.subjects = data.data));
    this.profService
      .getAllAutor()
      .subscribe((data) => (this.auteurs = data.data));
  }

  updateAssignment(): void {
    this.assignmentService
      .modifyAssignemnt(this.assignmentData)
      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }

  selectSubject(subjectId: string): void {
    this.assignmentData.matiere._id = subjectId;
  }
}
