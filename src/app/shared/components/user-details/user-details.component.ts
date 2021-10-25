import { UserDetails } from './../../../models/user-details';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  @Input() userDetails!: UserDetails | null|any;
  constructor() {}

  ngOnInit(): void {}
}
