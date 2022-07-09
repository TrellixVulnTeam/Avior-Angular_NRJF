import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { timestamp } from 'rxjs';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  isAuthenticated: boolean = false;
  unit: string = "";
  code: string = "";
  ngOnInit(): void {
    this.isAuthenticated = false;
  }
  
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.unit = params['unit'];
    });
    this.route.params.subscribe(params => {
      this.code = params['code'];
    })

  }
  public logout(): void {

  }
  public checkAuthentication(u: string, p:  string) {
    let url = 'http://www.mobikey.eu/usr/' + u+'/pwd/' +p;
    let out: number = 0;
    var oReq = new XMLHttpRequest();
    oReq.onload= () => {
      if (oReq.readyState === 4) {  // klar for å motta
        if (oReq.status === 200) {  // godtatt bruker
          this.setAuthentication(true);
          this.setCode(p);
          this.setUnit(u);
          this.login();
        }
      }
      console.log('Unit: ' + u + ' Code: ' + p + ' Is Authenticated: ' + this.isAuthenticated);
    }
   
   
    oReq.open("GET", 'http://www.mobikey.eu/usr/'+u+'/pwd/'+p);
    oReq.responseType = "text";
    oReq.send();
    
  }
  setUnit(unitString: string) {
    this.unit = unitString;
  }
  setCode(codeString: string) {
    this.code = codeString;
  }
  setAuthentication(isAuthenticatedBool: boolean) {
    this.isAuthenticated = isAuthenticatedBool;
  }
  login() {
    if (true) {
      let x = "asd";
      document.getElementById("logginnKnapp")?.innerText == x;
    }

    this.router.navigate(['/usr/', this.unit,'pwd',this.code]);
  }

  
}
