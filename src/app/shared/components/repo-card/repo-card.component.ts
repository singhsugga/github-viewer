import { Component, Input, OnInit } from '@angular/core';
import {RepoData} from '../../../models/repo-data'
@Component({
  selector: 'app-repo-card',
  templateUrl: './repo-card.component.html',
  styleUrls: ['./repo-card.component.scss']
})
export class RepoCardComponent implements OnInit {
 @Input() repoDetails !:RepoData;
  constructor() { }

  ngOnInit(): void {
  }

}
