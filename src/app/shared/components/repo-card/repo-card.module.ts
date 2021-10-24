import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoCardComponent } from './repo-card.component';



@NgModule({
  declarations: [
    RepoCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RepoCardComponent
  ]
})
export class RepoCardModule { }
