import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // propriété pour savoir si l'utilisateur est connecté
  // loggedIn = false;
  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());

  constructor(
    private http:HttpClient,private router: Router, private loadingService: LoadingService) { }

    private checkToken(): boolean {
      const token = localStorage.getItem('token');
      return token !== null;
    }

uri = 'http://localhost:8010/api/';

  // méthode pour connecter l'utilisateur
  // Typiquement, il faudrait qu'elle accepte en paramètres
  // un nom d'utilisateur et un mot de passe, que l'on vérifierait
  // auprès d'un serveur...
  logIn(login: string, password: string): Observable<boolean>{
    // console.log("adddddd"+login)
    this.loadingService.setLoading(true);
    return this.http.post<any>(this.uri+"auth/login", { login, password }).pipe(
      tap(response => {
        if (response && response.data.token) {
          this.roles = response.data.role;
          console.log(response)
          localStorage.setItem('roles', response.data.role);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('id', response.data.id);
          this.loggedIn.next(true);
          this.loadingService.setLoading(false);
        }
      }),
      catchError(error => {
        console.error('Login failed', error);
        this.loadingService.setLoading(false);
        return of(false);
      })
    );
  }
  private roles: string[] = [];
  // méthode pour déconnecter l'utilisateur
  logOut() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
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

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token!=null) {
      return false
    }else{
      return true
    }
  }
}

