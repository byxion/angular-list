import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { HttpServiceService } from '../service/http-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private httpService: HttpServiceService,
    private router: Router
  ) {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      occupation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.addUserForm.valid) {
      const newUser = this.addUserForm.value;
      // Ajoutez l'utilisateur à votre API via le service HTTP
      this.httpService.addUser(newUser).subscribe((user) => {
        // Mise à jour de la liste des utilisateurs dans le service UserService
        this.userService.addUser(user);
        // Redirection vers la liste des utilisateurs
        this.router.navigate(['/users']);
      });
    }
  }
}
