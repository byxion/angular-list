import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Observable pour surveiller l'état de l'authentification
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}

  // Méthode pour mettre à jour l'état de l'authentification
  setAuthenticationStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    this.setAuthenticationStatus(false);
  }
}
