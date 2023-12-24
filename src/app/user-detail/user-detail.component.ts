import {Component, OnInit} from '@angular/core';
import {User} from "../user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  userTransmis:User = new User(0,'', '', '', '', '');

  constructor (private userService:UserService,private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userService.selectUser(params['id']);
      this.userService.userSelectionne.subscribe(user => this.userTransmis = user);
    });

  }
}
