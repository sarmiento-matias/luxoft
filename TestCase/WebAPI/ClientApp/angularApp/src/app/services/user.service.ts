import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig } from '../../types/AppConfig';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../../providers/config.provider';
import { User } from '../../types/User';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.config.apiEndpoint}/user/all`).pipe(
      catchError((error) => {
        console.error('Error fetching users', error);
        return [];
      })
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.config.apiEndpoint}/user/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching user', error);
        throw error;
      })
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.config.apiEndpoint}/user/add`, user).pipe(
      catchError((error) => {
        console.error('Error adding user', error);
        throw error;
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.config.apiEndpoint}/user/update/${user.id}`, user).pipe(
      catchError((error) => {
        console.error('Error updating user', error);
        throw error;
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.config.apiEndpoint}/user/delete/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting user', error);
        throw error;
      })
    );
  }
}

