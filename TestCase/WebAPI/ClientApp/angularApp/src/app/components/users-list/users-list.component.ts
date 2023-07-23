import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../types/User';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: User[] = [];
  @Output() delete: EventEmitter<User> = new EventEmitter<User>();

  onDelete(user: User) {
    this.delete.emit(user);
  }
}

