import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { user } from '../user.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selected: any;
  user!: user;
  constructor(private data: DataService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.selected = params['n']);
    this.user = this.data.getUser(this.selected);
  }

  ngOnInit(): void {
    console.log(this.selected);
    console.log(this.user);
  }

}
