import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { user } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selected: any;
  user!: user;
  unit!: string;
  code!: string;
  change: boolean;
  username: string ="";
  type: string = "";
  identifier: string = "";
  groupIn: string = "";
  start: string = "";
  stop: string = "";
  weekdays: string = ""; 
  tickets: string = "";
  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(params => this.selected = params['n']);
    this.change = false;
    this.route.params.subscribe(params => this.unit = params['unit']);
    this.route.params.subscribe(params => this.code = params['code']);
    this.user = this.data.getUser(this.selected);
  }
  createNewUser(username: string, type:string, identifier:string, group:string,
    start:string, stop:string, weekdays: string, tickets: string) {
      this.username = username; this.type = type; this.identifier = identifier;
      this.groupIn = group;
      this.start = start;
      this.stop = stop; this.weekdays = weekdays; this.tickets = tickets;
      this.type = this.getType(this.type);
      this.groupIn = this.getGroup();
      console.log("group = = = " + this.groupIn);
      let bool: boolean = (this.groupIn != "" && this.username != "" && this.identifier != "" && this.type != "");
      let url = "http://www.mobikey.eu/cmd/J/"+this.unit + "/pwd/" +this.code;
      console.log(bool + " " + this.groupIn);
      if (bool) {
        this.xmlRequestId(this.identifier, url);
        this.router.navigate(['/usr/', this.unit,'pwd',this.code]);
      }
    }
    xmlRequestId(id: string, url: string)  {
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
      let x = this.getGroup();
      if (x === "None") {
        this.groupIn = "";
      }
      let sendValue = "at#eu="+this.type.charAt(1)+","+id+","+bruker+","+this.groupIn+"," +this.start +"," +this.stop +"," +this.weekdays + "," +this.tickets;
      console.log(sendValue)
      xhr.send(sendValue);
      

    }
  
      getGroup() {
        if (false) {
          return "None";
        } else {
          return this.groupIn;
        }
      }
  ngOnInit(): void {
    console.log(this.selected);
    console.log(this.user);
  }
  delete(type: string, id: string, username: string) {
    var xhr = new XMLHttpRequest();
    if (id.charAt(0) === '+') {
    id = id.substring(1);
    }
    let unit = this.unit;
    let code = this.code;
    let router = this.router;
    let url = "http://www.mobikey.eu/cmd/J/"+this.unit + "/pwd/" +this.code;;
    console.log(url);
    xhr.open("POST", url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (this.status === 200) {

          window.alert("Deleted user: " + username + " Id: "+id );
          router.navigate(['/usr/', unit,'pwd', code]);
        }
      }
     
    }
    let msg = "AT#EU="+this.getType(type)+","+id;
    console.log(msg);
    xhr.send(msg);
  }
  urlcheck() {
    
    return document.location.href.includes('details');
  }
  getType(type: string) {
    let x = type;
    let re = "";
    for (let i = 0; i < x.length; i++) {
      if (i === 3) {
        re+=x.charAt(i);
        console.log(re);
      }
    }
    return re;
  }

}
