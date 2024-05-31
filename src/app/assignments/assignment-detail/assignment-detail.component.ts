import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import  {RouterLink} from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoteFormComponent } from '../note-form/note-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observer } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink,MatDividerModule, MatDialogModule, MatProgressSpinnerModule,
    MatButtonModule, MatCardModule, MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis!: Assignment|any;

  constructor(private assignmentsService:AssignmentsService,
              private authService:AuthService,
              private route:ActivatedRoute,
              private router:Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) { }

role : any
isLoading: boolean = false;
  ngOnInit() {
    // Recuperation des query params (ce qui suit le ? dans l'url)
    console.log(this.route.snapshot.queryParams);
    // Recuperation des fragment (ce qui suit le # dans l'url)
    console.log(this.route.snapshot.fragment);
    this.role = localStorage.getItem('roles');
    // On recupere l'id de l'assignment dans l'URL à l'aide de ActivatedRoute
    const id = this.route.snapshot.params['id'];
    console.log("ity ilay id",id);
    // On utilise le service pour récupérer l'assignment avec cet id
    this.isLoading = true; // Activer le chargement

    // Création de l'observateur partiel pour l'appel API
    const observer: Partial<Observer<any>> = {
      next: (assignment) => {
        this.snackBar.open(`${assignment.message} ✔️`, 'Fermer', {
          duration: 3000
        });
        console.log("haha" + JSON.stringify(assignment));
        console.log(assignment);
        this.assignmentTransmis = assignment.data;
      },
      error: (error) => {
        this.snackBar.open(`${error.message || 'Erreur lors de la récupération des données'} ✔️`, 'Fermer', {
          duration: 3000
        });
        console.error('Erreur lors de la récupération des données', error);
        this.isLoading = false; // Désactiver le chargement en cas d'erreur
      },
      complete: () => {
        this.isLoading = false; // Désactiver le chargement quand c'est terminé
      },
    };

    // Appel API pour récupérer l'assignment par ID
    this.assignmentsService.getAssignment(id).subscribe(observer);
  }

  onAssignmentRendu() {
    // on a cliqué sur la checkbox, on change le statut de l'assignment
    if(this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;
      this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        this.snackBar.open(`${message} ✔️`, 'Fermer', {
          duration: 3000
        });
        console.log(message);
        // on navigue vers la liste des assignments
        this.router.navigate(['/home']);
      });
    }
  }

  onDelete() {
    // on va directement utiliser le service
    if(this.assignmentTransmis) {
      this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        this.snackBar.open(`${message} ✔️`, 'Fermer', {
          duration: 3000
        });
        console.log(message);
        // on va cacher la vue de detail en mettant assignmentTransmis à undefined
        this.assignmentTransmis = undefined;
        // on navigue vers la liste des assignments
        this.router.navigate(['/home']);
      });
    }
  }

  isAdmin() {
    return true;
  }

  // openNoteDialog(): void {
  //   const dialogRef = this.dialog.open(NoteFormComponent, {
  //     width: '300px',
  //     data: { note: this.assignmentTransmis.note, remarque: this.assignmentTransmis.remarque }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.assignmentTransmis.note = result.note;
  //       this.assignmentTransmis.remarque = result.remarque;
  //     }
  //   });
  // }

  animal: string ="tayy";
  name: string ="";
  openDialog(): void {
    const dialogRef = this.dialog.open(NoteFormComponent, {
      data: {assignmentTransmis: this.assignmentTransmis, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open(`${result} ✔️`, 'Fermer', {
        duration: 3000
      });
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
