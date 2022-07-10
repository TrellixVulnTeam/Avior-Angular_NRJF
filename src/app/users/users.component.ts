import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../data.service';
import { user } from '../user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: user[] = [];
  groups: string[] = [];
  unit: string ="";
  code: string ="";
  elements: number;
  searchGroup: string;
  searchFieldValue: string;
  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) {  
    this.searchFieldValue = ""; 
    this.searchGroup = "Alle";
    this.elements = 0;
    this.route.params.subscribe(params => this.unit = params['unit']);
    this.route.params.subscribe(params => this.code = params['code']);
    
  }
  createNew() {
    this.router.navigate(['/usr/', this.unit,'pwd',this.code, this.elements, 'newuser']);
  }
  detailsUser(name: string) {
    this.router.navigate(['/usr/', this.unit,'pwd',this.code, 'details',name]);

  }
  checkMatch(name:string, grp: string, srchGrp: string) {
      this.searchGroup = srchGrp;
      let bool: boolean =
       (name.toUpperCase().includes(this.searchFieldValue.toUpperCase())); 
      if (bool) {
        bool = ((grp === this.searchGroup) || (this.searchGroup === "") || (this.searchGroup === "Alle") );
        if (this.searchGroup === "None" && grp === "") {
          bool = true;
        }
      }
      
      return bool;
  }
  onChangeEvent(event: any){
    this.searchFieldValue = event.target.value;
  }

  ngOnInit(): void {
    
   this.users = this.data.getUsers(this.unit, this.code, this.searchFieldValue);   
  }
  test(index: number) {
    this.elements = index+1;
    this.groups = getGroups(this.users, this.elements, this.groups);
    return true;
  }
}

// dette ble litt rotete, TODO -> rydd opp
function getGroups(users: user[], amount: number, oldGroups: string[]): string[] {
  let groups:string[] = oldGroups;
  let x = groups.length;
  for (let i = 0; i < amount; i++) {
    let newGroup:string = users[i].g;
    if (!contains(oldGroups, newGroup) && newGroup !== "") {
    groups[x] = newGroup;
    x++;
    }
  }
  return groups;
}
function contains(oldGroups:string[], el:string):boolean {
  for (let i = 0; i < oldGroups.length; i++) {
    if (oldGroups[i].includes(el)) {
      return true;
    }
  }
  return false;
}

