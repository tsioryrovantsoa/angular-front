import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ProfService } from '../../prof/prof.service';
import { Prof } from '../../prof/prof.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent implements OnInit {
  // champs du formulaire
  professors: Prof[] = [];
  subjects: any[] = [];
  classes: any[] = [];
  selectedProfessor: string | undefined | null;
  showProfessor: boolean = true;
  assignmentData: any = {
    nom: '',
    dateDeRendu: new Date(),
    rendu: false,
    renduauteur: false,
    matiere: '',
    classe: '',
    note: null,
    remarques: null,
  };

  constructor(
    private assignmentsService: AssignmentsService,
    private profService: ProfService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(JSON.stringify(localStorage.getItem('roles')));
    console.log(localStorage.getItem('roles') === "professeur");
    if(localStorage.getItem('roles') == "professeur"){
      this.selectedProfessor = localStorage.getItem('id');
      console.log(this.selectedProfessor);
      this.selectProfessor(localStorage.getItem('id'));
      this.showProfessor = false;
    }else{
      this.loadProfessors();
    }
  }

  loadProfessors() {
    this.profService.getProfessors().subscribe((response) => {
      console.log(response.data);
      this.professors = response.data;
    });
  }

  selectProfessor(profId: string|null) {
    this.selectedProfessor = profId;
    this.profService
      .getProfessorSubjects(profId)
      .subscribe((response) => {
        this.subjects = response.data;
      });
  }

  selectSubject(subjectId: string) {
    this.profService
      .getSubjectClasses(subjectId)
      .subscribe((response) => {
        console.log(response.data);
        this.classes = response.data;
      });
  }

  createAssignment() {
    console.log(this.assignmentData);
    this.assignmentsService.createAssignment(this.assignmentData).subscribe(
      (response) => {
        console.log('Assignment created successfully:', response);
        // Redirection ou autre logique de gestion après la création
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error creating assignment:', error);
        // Gérer les erreurs
      }
    );
  }
}
