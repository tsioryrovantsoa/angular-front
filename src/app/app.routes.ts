import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { MatiereComponent } from './matiere/prof/matiere/matiere.component';
import { LoginGuard } from './shared//login.guard';
import { AssignementOngletComponent } from './assignement-onglet/assignement-onglet.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'home', component: AssignmentsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: "add", component: AddAssignmentComponent, canActivate: [AuthGuard] },
  { path: "assignments/:id", component: AssignmentDetailComponent, canActivate: [AuthGuard] },
  { path: "assignments/:id/edit", component: EditAssignmentComponent, canActivate: [AuthGuard] },
  { path: "matieres/:id", component: MatiereComponent, canActivate: [AuthGuard] },
  { path: 'onglets', component: AssignementOngletComponent, canActivate: [AuthGuard] },
];
