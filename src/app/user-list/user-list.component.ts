import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {User} from '../user.model';
import {UserService} from "../service/user.service";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'occupation', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  filterValue = '';

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  // Méthode de déconnexion
  logout() {
    this.authService.logout();
    // Vous pouvez rediriger l'utilisateur vers la page de connexion ou une autre page après la déconnexion
    this.router.navigate(['/home']);
  }
  constructor (private userService:UserService, private authService:AuthenticationService, private router:Router) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.userService.getAssignments().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    });

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  deleteUser(user:User) {
    this.userService.deleteUser(user)
      .subscribe(message => console.log(message));
  }

  customFilterPredicate(data: User, filter: string): boolean {
    const searchString = filter.trim().toLowerCase();
    return (
      data.name.toLowerCase().includes(searchString) ||
      data.email.toLowerCase().includes(searchString) ||
      data.occupation.toLowerCase().includes(searchString)
    );
  }
}
