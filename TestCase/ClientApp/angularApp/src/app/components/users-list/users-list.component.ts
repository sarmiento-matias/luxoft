import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from "../../../types/User";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent  {
 @Input() users: User[] = [];
 @Output() emitDelete: EventEmitter<User> = new EventEmitter<User>();
  delete(user: User) {
    this.emitDelete.emit(user);
  }
}
