import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from './user.model';
import { group } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  retur: any; 
  list: user[] = [];
  groups: string[] = [];
  unit: string = "";
  code: string = "";
  amount: number = 0;
  getGroups() {
    return this.groups;
  }
  constructor(private http: HttpClient) {

   }
   getUsers(unit: string, code: string, search: string) : user[] {
    this.unit = unit; this.code = code;
    this.list.splice(0);
    this.amount = 0;
    this.list = this.xmlRequest(this.list, search);
    return this.list;
  }
  getNumberOfUsers(inp: string) {
    this.getUsers(this.unit, this.code, inp);
    return this.amount;
  }
  getUser(input: string):user {
    let bool = false;
    
    for (let i = 0; i < this.list.length && !bool; i++) {
      if (this.list[i].n.includes(input)) {
        bool = true;
        this.retur = new user(this.list[i].type,this.list[i].id,this.list[i].n,this.list[i].g,
          this.list[i].s,this.list[i].e,this.list[i].w,this.list[i].t);
          
        
      }
    }
    
    console.log(this.retur);
    return this.retur;
  }

  groupContains(el: string) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].includes(el)) {
        return true;
      }
    }
    return false;
  }
  xmlRequest(users: user[], search: string) : user[] {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function(e) {
      var response = oReq.response;
      return fillTable(users, response, search);  
    }
    
   
    oReq.open("GET", 'http://www.mobikey.eu/usr/'+this.unit+'/pwd/'+this.code);
    oReq.responseType = "text";
    oReq.send();
    return users;
  }
}
function fillTable(users: user[], response: string, search: string):user[] {
  response = response.substring(0, response.lastIndexOf(','));
  let tab = response.split(',');
  let u = 0;
  for (let i = 0; i < tab.length; i+=7) {
    let temp = new user(
      tab[i],
      tab[i+1],
      tab[i+2],
      tab[i+3],
      tab[i+4],
      tab[i+5],
      tab[i+6],
      '0'
    )
    if (tab[i] !== '' && temp.n.toUpperCase().includes(search.toUpperCase())) {
    users[u] = temp;
    u++;
    }
   
  } 

  return users;
}


        
   