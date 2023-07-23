import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {UserService} from "./services/user.service";
import {User} from "../types/User";
import {FormControl, FormGroup } from '@angular/forms';
import {MasterDataService} from "./services/master-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{

  public users: User[] = []

  public userForm: FormGroup= new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  constructor(private userService: UserService, private masterData: MasterDataService) {}


  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
    this.masterData.getIsAdminSelection().subscribe((data) => {console.debug(data)});
    }

  addUser() {
    this.userService.addUser(this.userForm.value).subscribe((data) => {
      console.debug(data);
      this.userService.getUsers().subscribe((data) => {
        this.users = data;
      });
    });
  }

  onDelete(user: User) {
    this.userService.deleteUser(user.id).subscribe((data) => {
      console.debug(data);
      this.userService.getUsers().subscribe((data) => {
        this.users = data;
      });
    });
  }
}
