import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../user.model";
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSelectionne:BehaviorSubject<User> = new BehaviorSubject<User>(new User(0,'', '', '', '', ''));

  users = new BehaviorSubject<User[]> ([]);
  constructor(private http: HttpServiceService) {
    this.initUsers();
  }

  initUsers() {
    this.http.getUsers().subscribe(users => {
      this.users.next(users);
    });
  }
  getAssignments():BehaviorSubject<User[]> {
    return this.users;
  }

  addUser(user:User):BehaviorSubject<User> {
    const subject = this.users.getValue();
    subject.push(user);
    this.users.next(subject);
    return new BehaviorSubject(user);
  }

  updateUser(user:User):BehaviorSubject<string> {
    const subject = this.users.getValue();
    const index = subject.findIndex(a => a.id === user.id);
    console.log(subject[index]);
    subject[index] = user;
    this.users.next(subject);
    return new BehaviorSubject('User mis à jour');
  }

  deleteUser(user:User):BehaviorSubject<string> {
    const subject = this.users.getValue();
    const index = subject.findIndex(a => a.name === user.name);
    console.log(subject[index]);
    subject.splice(index, 1);
    this.users.next(subject);
    this.userSelectionne.next(new User(0,'', '', '', '', ''));
    return new BehaviorSubject('User supprimé');
  }

  selectUser(id: number) {
    const sub = this.http.getUser(id).subscribe(users => {
      this.userSelectionne.next(users);
      sub.unsubscribe();
    });
  }
}
