import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLoaderComponent } from './card-loader/card-loader.component';



@NgModule({
  declarations: [
    CardLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardLoaderComponent
  ]
})
export class CardLoaderModule { }
