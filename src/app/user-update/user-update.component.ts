import {Component, OnInit} from '@angular/core';
import {User} from "../user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userTransmis:User = new User(0,'', '', '', '', '');

  constructor (private userService:UserService,private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userService.selectUser(params['id']);
      this.userService.userSelectionne.subscribe(user => this.userTransmis = user);
    });
  }

  onSubmit(value: any) {
    const user = new User(this.userTransmis.id, value.name, value.email, value.occupation, this.userTransmis.bio, this.userTransmis.password);
    this.userService.updateUser(user)
      .subscribe(message => console.log(message));
    this.router.navigate(['/users']).then(r => console.log('La navigation s\'est faite'));

  }

}
