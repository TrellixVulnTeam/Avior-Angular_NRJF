
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { DataService } from '../data.service';
import { user } from '../user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  username: string ="";
  type: string ="";
  identifier: string ="";
  groupIN: string ="";groupX: string ="";
  start: string ="";
  stop: string ="";
  weekdays: string ="";
  tickets: string ="";
  accepted: boolean = false;
  valg: string = "New Group";
  groups: string[] = [];
  unit: string = "";
  code: string = "";
  users: user[];
  elements: number;
  idAccept: boolean = false;
  constructor(private data: DataService, private route: ActivatedRoute, private router:Router) {
    this.elements = 0;
    this.route.params.subscribe(params => this.unit = params['unit']);
    this.route.params.subscribe(params => this.code = params['code']);
    this.route.params.subscribe(params => this.elements = params['amount']);
    this.users = this.data.getUsers(this.unit, this.code, ""); 
   }

  valgt(): number {
    if (this.valg.toUpperCase().includes("New Group".toUpperCase())) {
      return 1;
    } else if (this.valg.toUpperCase().includes("Existing".toUpperCase())) {
      return 2;
    } else {
      return 0;
    }
  }
  ngOnInit(): void {
    this.xmlRequest(this.users, this.groups);
  }

  // ++ på parametere amount
  createNewUser(username: string, type:string, identifier:string, group:string,
    start:string, stop:string, weekdays: string, tickets: string) {
      this.username = username; this.type = type; this.identifier = identifier;
      this.groupIN = group;
      this.start = start;
      this.stop = stop; this.weekdays = weekdays; this.tickets = tickets;
      this.type = this.getType(this.type);
      this.groupIN = this.getGroup();
      console.log("group = " + this.groupIN);
      let bool: boolean = (this.groupIN != "" && this.username != "" && this.identifier != "" && this.type != "");
      let url = "http://www.mobikey.eu/cmd/J/"+this.unit + "/pwd/" +this.code;
      if (bool) {
        this.xmlRequestId(this.users, this.identifier, url);
        this.router.navigate(['/usr/', this.unit,'pwd',this.code, 'details',this.username]);
      }
    }
      getGroup() {
        if (this.valgt() === 0) {
          return "None";
        } else {
          return this.groupIN;
        }
      }
    getType(type: string): string {
      if (type === "Telephone") {
        return "T";
      } else if (type === "Bluetooth") {
        return "U";
      } else if (type === "Email") {
        return "E";
      } else if (type === "WebID") {
        return "W";
      } else if (type === "AppID") {
        return  "A";
      } else {
        return "";
      }
    }
    xmlRequest(users: user[], group: string[]) : string[] {
      var oReq = new XMLHttpRequest();
      oReq.onreadystatechange = function(e) {
        var response = oReq.response;
        return groups(users, response, group);  
      }
      
     
      oReq.open("GET", 'http://www.mobikey.eu/usr/'+this.unit+'/pwd/'+this.code);
      oReq.responseType = "text";
      oReq.send();
      return group;
    }
    xmlRequestId(users: user[], id: string, url: string)  {
      var xhr = new XMLHttpRequest();
      let t = this.type;
      let userN = this.username;
      console.log(url);
      xhr.open("POST", url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function(e) {
        if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          
          window.alert("Bruker: "+ userN +" blir lagt til");
        }
      }
      if (t === "T") {
        if (!(id.includes('+'))) {
          let idstr = "+";
          
          id = idstr + id;
          console.log(id);
        } 
      } else {
        console.log("NOT TELEPHONE");
      }
      let bruker = this.username.replace(/\s/g, "-");
      if (this.start === "") {
        this.start = "0001010000";
      }
      if (this.stop === "") {
        this.stop = "99-12-30-23-59";

      }
      let stopstr = "";
      for (let i = 0; i < this.stop.length; i++) {
        let x  = this.stop.charAt(i);
        if (x === '0' ||x === '1' ||x === '2' ||x === '3' ||x === '4' ||x === '5' ||x === '6' ||
        x === '7' ||x === '8' ||x === '9' ) {
          stopstr += x;
        }
        
      }
      this.stop = stopstr;
      //AT#EU=T,+4795197660,Magnus,Magnus,0001010000,9912312359,YYYYYYY,0
      //at#eu=T,+4795197660,Magnus,Magnus,0001010000,99-12-30-23-59,,
      let sendValue = "at#eu="+this.type+","+id+","+bruker+","+this.getGroup()+"," +this.start +"," +this.stop +"," +this.weekdays + "," +this.tickets;
      console.log(sendValue)
      console.log(id);
      let sendX = "AT#EU="+this.type+","+this.identifier +"["+this.username+","+this.groupIN+","+this.start+","+this.stop+"," + this.weekdays+","+this.tickets+"]";
      xhr.send(sendValue);
      

    }
  }
function groups(users: user[], response: string, groups: string[]): any {
  response = response.substring(0, response.lastIndexOf(','));

  let tab:string[] = response.split(',');
  for (let i = 0; i < tab.length; i+=7) {
      let temp = tab[i+3];
    if (!contains(groups, temp) && typeof(temp) !== 'undefined' && temp !== "") {
      groups[groups.length] = temp;
      console.log("la til " + temp);
    }
   
  } 
  let retur: string[] = [];
  for (let i = 0; i < groups.length; i++) {
    if (!(typeof(groups[i]) === 'undefined')) {
      retur[retur.length] = groups[i];
    }
  }
  return retur;
}

function contains(oldGroups:string[], el:string):boolean {
  let funnet:boolean = false;
  for (let i = 0; i < oldGroups.length && !funnet; i++) {
    if (oldGroups[i] === el && el !== '') {
      funnet = true;
    }
  }
  return funnet;
}
