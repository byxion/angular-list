import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  constructor(private httpClient: HttpClient) { }

  baseUrl = 'https://657b7363394ca9e4af145cfa.mockapi.io/api/v1/User';

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  public getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + '/' + id);
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user);
  }
}
