import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsLoaderComponent } from './user-details-loader.component';



@NgModule({
  declarations: [
    UserDetailsLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[UserDetailsLoaderComponent]
})
export class UserDetailsLoaderModule { }
