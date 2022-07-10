import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  isLoggedIn() {
    let url = window.location.href;
    return url.toLowerCase().includes("/login");
  }
}
