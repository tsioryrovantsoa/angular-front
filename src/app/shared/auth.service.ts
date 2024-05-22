import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;

  constructor(
    private http:HttpClient,private router: Router) { }

uri = 'http://localhost:8010/api/';

  // méthode pour connecter l'utilisateur
  // Typiquement, il faudrait qu'elle accepte en paramètres
  // un nom d'utilisateur et un mot de passe, que l'on vérifierait
  // auprès d'un serveur...
  logIn(login: string, password: string): Observable<boolean>{
    this.loggedIn = true;
    return this.http.post<any>(this.uri+"auth/login", { login, password }).pipe(
      tap(response => {
        if (response && response.data.token) {
          this.roles = response.data.role;
          console.log(response)
          localStorage.setItem('roles', JSON.stringify(this.roles));
          localStorage.setItem('token', response.data.token);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(false);
      })
    );
  }
  private roles: string[] = [];
  // méthode pour déconnecter l'utilisateur
  logOut() {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  // methode qui indique si on est connecté en tant qu'admin ou pas
  // pour le moment, on est admin simplement si on est connecté
  // En fait cette méthode ne renvoie pas directement un booleén
  // mais une Promise qui va renvoyer un booléen (c'est imposé par
  // le système de securisation des routes de Angular)
  //
  // si on l'utilisait à la main dans un composant, on ferait:
  // this.authService.isAdmin().then(....) ou
  // admin = await this.authService.isAdmin()
  isAdmin() {
    const promesse = new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...
      resolve(this.loggedIn);
      // pas de cas d'erreur ici, donc pas de reject
    });

    return promesse;
  }
}
