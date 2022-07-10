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
  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(params => this.selected = params['n']);
 
    this.route.params.subscribe(params => this.unit = params['unit']);
    this.route.params.subscribe(params => this.code = params['code']);
    this.user = this.data.getUser(this.selected);
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
