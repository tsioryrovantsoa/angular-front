import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prof } from './prof.model';
import { Observable } from 'rxjs';
import { Matiere } from '../matiere/matiere.model';
import { Classe } from '../classe/classe.model';
import { AuthHeadersUtil } from '../utils/auth-headers.util';

@Injectable({
  providedIn: 'root',
})
export class ProfService {
  private uri = 'https://angular-back-2.onrender.com/api';

  constructor(private http: HttpClient) {}

  getProfessors(): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    return this.http.get<Prof[]>(`${this.uri}/utilisateurs/profs`,{headers});
  }

  getProfessorSubjects(profId: string|null): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    return this.http.get<Matiere[]>(`${this.uri}/matieres/prof/${profId}`,{headers});
  }

  getSubjectClasses(subjectId: string): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    return this.http.get<Classe[]>(`${this.uri}/classes/matiere/${subjectId}`,{headers});
  }

  getAllAutor(): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    return this.http.get<Prof[]>(`${this.uri}/utilisateurs/eleves`,{headers});
  }

  getAllMatiere(): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    return this.http.get<Matiere[]>(`${this.uri}/matieres`,{headers});
  }
}
