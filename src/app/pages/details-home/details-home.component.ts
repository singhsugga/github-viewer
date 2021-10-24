import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-home',
  templateUrl: './details-home.component.html',
  styleUrls: ['./details-home.component.scss']
})
export class DetailsHomeComponent implements OnInit {
  username = '';
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navigate(){
    if(this.username.trim().length > 0 ){
      this.router.navigate([`/profile/${this.username.trim()}`]);
    }
  }

}
