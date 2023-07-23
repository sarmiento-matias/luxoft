import { HttpClient } from '@angular/common/http';
import {Inject, Injectable } from '@angular/core';
import {AppConfig} from "../types/AppConfig";
import { of } from 'rxjs';
import {APP_CONFIG} from "../providers/config.provider";
import {User} from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {

  }


  getUsers() {
     return this.http.get<User[]>(`${this.config.apiEndpoint}/user/all`);
  }

  getUser(id: number) {
    return this.http.get('/users/' + id);
  }

  addUser(user: any) {
    return this.http.post(`${this.config.apiEndpoint}/user/add`, user);
  }

  updateUser(user: any) {
    return this.http.post('/users/' + user.id, user);
  }

  deleteUser(id: number) {
    return this.http.delete('/users/' + id);
  }
}
