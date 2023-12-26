import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServiceService } from '../service/http-service.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  connectionError: string = '';

  constructor(private httpService: HttpServiceService, private router: Router, private authService: AuthenticationService) {}

  // login.component.ts
  onSubmit() {
    // Réinitialiser le message d'erreur
    this.connectionError = '';

    // Vérifier la connexion avec votre service HTTP
    this.httpService.getUsers().subscribe(users => {
      const userFound = users.find(user => user.name === this.username && user.password === this.password);

      if (userFound) {
        // Utilisateur trouvé, connexion réussie
        console.log('Connexion réussie');
        this.authService.setAuthenticationStatus(true); // Mettre à jour l'état de l'authentification
        // Vous pouvez rediriger l'utilisateur vers la page souhaitée ici
        // Exemple de redirection vers la page user-list :
        this.router.navigate(['/users']);
      } else {
        // Aucun utilisateur trouvé, connexion échouée
        console.log('Connexion échouée');
        this.connectionError = 'Nom d\'utilisateur ou mot de passe incorrect.';
        // Vous pouvez gérer l'affichage d'un message d'erreur ici
      }
    });
  }
}
