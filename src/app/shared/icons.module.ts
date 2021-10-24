import { NgModule } from '@angular/core';

import {
  RiAncientGateFill,
  RiHome2Fill,
  RemixIconModule,
} from 'angular-remix-icon';

// Configure the required icons before hand
const icons = {
  RiAncientGateFill,
  RiHome2Fill,
};


@NgModule({
  imports: [
    RemixIconModule.configure(icons),
  ],
  exports: [
    RemixIconModule
  ]
})
export class IconsModule { }
