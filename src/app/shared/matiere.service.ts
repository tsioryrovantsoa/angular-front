import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Matiere } from '../matiere/matiere.model';
import { AuthHeadersUtil } from '../utils/auth-headers.util';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private baseUrl = 'https://angular-back-2.onrender.com/api/';

  constructor(private http: HttpClient) {}

  getMatieres(profId: string, page: number, limit: number): Observable<any> {
    const headers = AuthHeadersUtil.getAuthHeaders();
    const url = `${this.baseUrl}matieres/matiere/${profId}`+ '?page=' + page + '&limit=' + limit;
    return this.http.get<any>(
      url + '?page=' + page + '&limit=' + limit,
      { headers }
    );
  }
}
