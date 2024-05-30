import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// importation des données de test
import { bdInitialAssignments } from './data';
import { AuthHeadersUtil } from '../utils/auth-headers.util';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [];

  constructor(private logService: LoggingService, private http: HttpClient) {}

  uri = 'http://localhost:8010/api/assignments';
  // uri = "https://angular-back-2.onrender.com/api/assignments";

  // retourne tous les assignments
  getAssignments(): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    return this.http
      .get<{ data: { docs: Assignment[] } }>(this.uri, { headers })
      .pipe(map((response) => response.data.docs));
  }

  getAssignmentsPagines(page: number, limit: number): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();

    return this.http.get<Assignment[]>(
      this.uri + '?page=' + page + '&limit=' + limit,
      { headers }
    );
  }

  // renvoie un assignment par son id, renvoie undefined si pas trouvé

  getAssignment(id: string): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    return this.http.get<Assignment>(this.uri + '/' + id, { headers }).pipe(
      catchError(
        this.handleError<any>(
          '### catchError: getAssignments by id avec id=' + id
        )
      )
      /*
      map(a => {
        a.nom += " MODIFIE PAR LE PIPE !"
        return a;
      }),
      tap(a => console.log("Dans le pipe avec " + a.nom)),
      map(a => {
        a.nom += " MODIFIE UNE DEUXIEME FOIS PAR LE PIPE !";
        return a;
      })
      */
    );
    //let a = this.assignments.find(a => a.id === id);
    //return of(a);
  }

  // Methode appelée par catchError, elle doit renvoyer
  // i, Observable<T> où T est le type de l'objet à renvoyer
  // (généricité de la méthode)
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    };
  }

  // ajoute un assignment et retourne une confirmation
  addAssignment(assignment: Assignment): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    //this.assignments.push(assignment);
    this.logService.log(assignment.nom, 'ajouté');
    //return of("Assignment ajouté avec succès");
    return this.http.post<Assignment>(this.uri, assignment, { headers });
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // l'assignment passé en paramètre est le même objet que dans le tableau
    // plus tard on verra comment faire avec une base de données
    // il faudra faire une requête HTTP pour envoyer l'objet modifié
    const headers = AuthHeadersUtil.getAuthHeaders();
    this.logService.log(assignment.nom, 'modifié');
    //return of("Assignment modifié avec succès");
    return this.http.put<Assignment>(this.uri + '/note/' + assignment._id, {
      headers,
    });
  }

  noteAssignment(assignment: Assignment): Observable<any> {
    // l'assignment passé en paramètre est le même objet que dans le tableau
    // plus tard on verra comment faire avec une base de données
    // il faudra faire une requête HTTP pour envoyer l'objet modifié
    const headers = AuthHeadersUtil.getAuthHeaders();
    const options = { headers: headers };
    this.logService.log(assignment.nom, 'modifié');
    //return of("Assignment modifié avec succès");
    return this.http.put<Assignment>(
      this.uri + '/note/' + assignment._id,
      assignment,
      options
    );
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    // on va supprimer l'assignment dans le tableau
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    const headers = AuthHeadersUtil.getAuthHeaders();
    this.logService.log(assignment.nom, 'supprimé');
    //return of("Assignment supprimé avec succès");
    return this.http.delete(this.uri + '/' + assignment._id, { headers });
  }

  // VERSION NAIVE (on ne peut pas savoir quand l'opération des 1000 insertions est terminée)
  peuplerBD() {
    // on utilise les données de test générées avec mockaroo.com pour peupler la base
    // de données
    bdInitialAssignments.forEach((a) => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment).subscribe(() => {
        console.log('Assignment ' + a.nom + ' ajouté');
      });
    });
  }

  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    return forkJoin(appelsVersAddAssignment);
  }

  createAssignment(assignmentData: any): Observable<Assignment> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    return this.http.post<Assignment>(
      `${this.uri}/admin/prof`,
      assignmentData,
      { headers }
    );
  }

  modifyAssignemnt(assignment: any): Observable<Assignment> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    return this.http.put<Assignment>(
      this.uri + '/' + assignment._id,
      assignment,
      {
        headers,
      }
    );
  }
}
