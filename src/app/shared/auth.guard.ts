import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  // injection du service d'authentification
  const authService = inject(AuthService);
  // injection du router
  const router = inject(Router);

  //return authService.loggedIn;

  // C'est mieux d'utiliser une Promise car souvent
  // la fonction qui vérifie a besoin de faire une requête
  // à un serveur pour vérifier si l'utilisateur est bien
  // autorisé à accéder à la page. C'est ASYNCHRONE !
  // Donc la bonne pratique est d'implémenter isAdmin ou isLogged
  // comme une promesse qui renvoie un booléen.
  // return authService.isAdmin()
  //   .then(admin => {
  //       if (admin) {
  //         console.log("GUARD: Navigation autorisée");
  //         return true;
  //       } else {
  //         console.log("GUARD: Navigation NON autorisée");
  //         router.navigate(['/home']);
  //         return false;
  //       }
  //     }
  //   );
  if (authService.isAuthenticated()) {
    return true; // L'utilisateur est authentifié, autoriser l'accès à la route
  }
  // L'utilisateur n'est pas authentifié, rediriger vers la page de login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;


};
