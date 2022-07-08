import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { user } from '../user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: user[] = [];
  constructor(private data: DataService) {   
  }

  ngOnInit(): void {
   this.users = this.data.getUsers();
   
  }

}
