import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  retur: any; 
  list: user[] = [];
  constructor(private http: HttpClient) {

   }
   getUsers() : user[] {
    return this.xmlRequest(this.list);
  }
  getUser(input: string):user {
    let bool = false;
    this.list = this.getUsers();
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
  xmlRequest(users: user[]) : user[] {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function(e) {
      var response = oReq.response;

      return fillTable(users, response);  
    }
    
   
    oReq.open("GET", 'http://www.mobikey.eu/usr/gxl0/pwd/0000');
    oReq.responseType = "text";
    oReq.send();
    return users;
  }
}
function fillTable(users: user[], response: String) {
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
    if (tab[i] !== '') {
    users[u] = temp;
    u++;
    }
   
  } 
  
  return users;
}


        
   